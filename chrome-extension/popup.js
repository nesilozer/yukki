// Get current tab info
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// Update page info display
async function updatePageInfo() {
  const tab = await getCurrentTab();
  document.getElementById('currentUrl').textContent = tab.url;
  document.getElementById('currentTitle').textContent = tab.title;
}

// Execute script in current tab and get results
async function executeInPage(func) {
  const tab = await getCurrentTab();
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: func
  });
  return results[0].result;
}

// Extract all text from page
document.getElementById('extractText').addEventListener('click', async () => {
  const results = document.getElementById('results');
  results.innerHTML = '<p>Extracting text...</p>';

  const text = await executeInPage(() => {
    return document.body.innerText.slice(0, 1000); // First 1000 chars
  });

  results.innerHTML = `<pre>${text}...</pre>`;
});

// Extract all links from page
document.getElementById('extractLinks').addEventListener('click', async () => {
  const results = document.getElementById('results');
  results.innerHTML = '<p>Extracting links...</p>';

  const links = await executeInPage(() => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    return allLinks
      .map(a => ({ text: a.textContent.trim(), href: a.href }))
      .filter(link => link.href)
      .slice(0, 20); // First 20 links
  });

  results.innerHTML = links
    .map(link => `<div class="link-item"><a href="${link.href}" target="_blank">${link.text || link.href}</a></div>`)
    .join('');
});

// Highlight keywords on page
document.getElementById('highlightKeywords').addEventListener('click', async () => {
  const keyword = prompt('Enter keyword to highlight:');
  if (!keyword) return;

  const results = document.getElementById('results');
  results.innerHTML = '<p>Highlighting keywords...</p>';

  const count = await executeInPage((word) => {
    // Remove previous highlights
    document.querySelectorAll('.claude-highlight').forEach(el => {
      el.style.backgroundColor = '';
      el.classList.remove('claude-highlight');
    });

    // Add new highlights
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let count = 0;
    let node;
    const nodes = [];

    while (node = walker.nextNode()) {
      if (node.textContent.toLowerCase().includes(word.toLowerCase())) {
        nodes.push(node);
      }
    }

    nodes.forEach(node => {
      const parent = node.parentElement;
      if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
        parent.style.backgroundColor = 'yellow';
        parent.classList.add('claude-highlight');
        count++;
      }
    });

    return count;
  }, keyword);

  results.innerHTML = `<p>✅ Highlighted ${count} elements containing "${keyword}"</p>`;
});

// Initialize
updatePageInfo();
