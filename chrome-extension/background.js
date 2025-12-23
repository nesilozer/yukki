// Background service worker
// Runs in the background, persists across pages

console.log('🔧 Background service worker started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed!');
    // You can open a welcome page or set default settings
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  // Handle different actions
  if (request.action === 'saveData') {
    chrome.storage.local.set({ data: request.data }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'getData') {
    chrome.storage.local.get(['data'], (result) => {
      sendResponse({ data: result.data });
    });
    return true;
  }
});

// Example: Do something when user clicks the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked on tab:', tab.id);
});
