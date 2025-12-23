# 🎯 Extension Ideas & Code Snippets

Quick copy-paste examples to build useful tools fast!

## 1. LinkedIn Profile Scraper

Extract name, headline, and about section:

```javascript
// Add to popup.js
document.getElementById('scrapeLinkedIn').addEventListener('click', async () => {
  const data = await executeInPage(() => {
    const name = document.querySelector('.text-heading-xlarge')?.textContent.trim();
    const headline = document.querySelector('.text-body-medium')?.textContent.trim();
    const about = document.querySelector('.display-flex.ph5.pv3')?.textContent.trim();
    return { name, headline, about };
  });

  results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});
```

## 2. Price Tracker

Monitor product prices on e-commerce sites:

```javascript
// Add to content.js
function trackPrice() {
  // Amazon example
  const price = document.querySelector('.a-price-whole')?.textContent;
  const title = document.querySelector('#productTitle')?.textContent.trim();

  if (price && title) {
    chrome.storage.local.get(['prices'], (result) => {
      const prices = result.prices || [];
      prices.push({ title, price, date: new Date().toISOString() });
      chrome.storage.local.set({ prices });
    });
  }
}

setInterval(trackPrice, 60000); // Check every minute
```

## 3. Auto Form Filler

Fill forms automatically with saved data:

```javascript
// Add to popup.js
document.getElementById('fillForm').addEventListener('click', async () => {
  const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0100'
  };

  await executeInPage((data) => {
    document.querySelector('input[name="name"]').value = data.name;
    document.querySelector('input[type="email"]').value = data.email;
    document.querySelector('input[type="tel"]').value = data.phone;
  }, formData);
});
```

## 4. Dark Mode Toggle

Add dark mode to any website:

```javascript
// Add to popup.js
document.getElementById('toggleDark').addEventListener('click', async () => {
  await executeInPage(() => {
    const isDark = document.body.classList.toggle('extension-dark-mode');

    if (isDark) {
      const style = document.createElement('style');
      style.id = 'dark-mode-styles';
      style.textContent = `
        .extension-dark-mode {
          filter: invert(1) hue-rotate(180deg);
        }
        .extension-dark-mode img,
        .extension-dark-mode video {
          filter: invert(1) hue-rotate(180deg);
        }
      `;
      document.head.appendChild(style);
    } else {
      document.getElementById('dark-mode-styles')?.remove();
    }
  });
});
```

## 5. Screenshot Tool

Capture visible tab:

```javascript
// Add to popup.js
document.getElementById('screenshot').addEventListener('click', async () => {
  const tab = await getCurrentTab();

  chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
    const link = document.createElement('a');
    link.download = `screenshot-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  });
});

// Also add to manifest.json permissions:
// "permissions": ["activeTab", "storage", "scripting", "tabs"]
```

## 6. Email Finder

Extract emails from current page:

```javascript
// Add to popup.js
document.getElementById('findEmails').addEventListener('click', async () => {
  const emails = await executeInPage(() => {
    const text = document.body.innerText;
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const found = text.match(emailRegex) || [];
    return [...new Set(found)]; // Remove duplicates
  });

  results.innerHTML = emails.map(e => `<div>${e}</div>`).join('');
});
```

## 7. Tab Manager with Storage

Save and restore tab sessions:

```javascript
// Add to popup.js
document.getElementById('saveTabs').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const urls = tabs.map(t => t.url);

  chrome.storage.local.set({ savedSession: urls }, () => {
    results.innerHTML = `<p>Saved ${urls.length} tabs!</p>`;
  });
});

document.getElementById('restoreTabs').addEventListener('click', async () => {
  chrome.storage.local.get(['savedSession'], (result) => {
    if (result.savedSession) {
      result.savedSession.forEach(url => {
        chrome.tabs.create({ url });
      });
    }
  });
});
```

## 8. Word Counter with Stats

Advanced text analysis:

```javascript
// Add to popup.js
document.getElementById('analyzeText').addEventListener('click', async () => {
  const stats = await executeInPage(() => {
    const text = document.body.innerText;
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;

    return {
      words: words.length,
      characters: chars,
      sentences,
      avgWordLength: avgWordLength.toFixed(1)
    };
  });

  results.innerHTML = `
    <p><strong>Words:</strong> ${stats.words}</p>
    <p><strong>Characters:</strong> ${stats.characters}</p>
    <p><strong>Sentences:</strong> ${stats.sentences}</p>
    <p><strong>Avg Word Length:</strong> ${stats.avgWordLength}</p>
  `;
});
```

## 9. API Integration Example

Connect to external API (e.g., Supabase):

```javascript
// Add to popup.js
document.getElementById('saveToAPI').addEventListener('click', async () => {
  const data = {
    url: window.location.href,
    title: document.title,
    timestamp: new Date().toISOString()
  };

  const response = await fetch('https://your-api.supabase.co/rest/v1/bookmarks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'your-api-key',
      'Authorization': 'Bearer your-api-key'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    results.innerHTML = '<p>✅ Saved to database!</p>';
  }
});
```

## 10. Custom ChatGPT Enhancement

Add features to ChatGPT interface:

```javascript
// Add to content.js with specific match in manifest.json
// "matches": ["https://chat.openai.com/*"]

function enhanceChatGPT() {
  // Add export button
  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Chat';
  exportBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;';

  exportBtn.onclick = () => {
    const messages = Array.from(document.querySelectorAll('[data-message-author-role]'))
      .map(el => el.textContent);

    const blob = new Blob([messages.join('\n\n---\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-export.txt';
    a.click();
  };

  document.body.appendChild(exportBtn);
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceChatGPT);
} else {
  enhanceChatGPT();
}
```

## 🎨 Styling Tips

Quick CSS snippets for better popups:

```css
/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animated button */
.btn-animated {
  position: relative;
  overflow: hidden;
}

.btn-animated::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-animated:hover::before {
  width: 300px;
  height: 300px;
}
```

---

**Pro Tips:**
- Start with one feature, test it, then add more
- Use `console.log()` liberally for debugging
- Check Chrome DevTools Console for errors
- Save data to `chrome.storage.local` for persistence
- Use `chrome.storage.sync` to sync across devices

Ask Claude to implement any of these, or combine them for your perfect tool!
