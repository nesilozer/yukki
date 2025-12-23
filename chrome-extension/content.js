// Content script - runs on every page
// This is where you can manipulate the DOM of websites

console.log('🚀 Quick Tool extension loaded!');

// Example: Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    sendResponse({ status: 'pong' });
  }

  // Add more custom actions here
  // Example:
  // if (request.action === 'customAction') {
  //   // Do something with the page
  //   sendResponse({ result: 'done' });
  // }

  return true; // Keep message channel open for async response
});

// Example: Automatically do something when page loads
// Uncomment to enable:
// window.addEventListener('load', () => {
//   console.log('Page loaded, do something cool!');
// });
