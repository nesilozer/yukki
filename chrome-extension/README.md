# 🚀 Quick Chrome Extension Builder

Build useful Chrome extensions in minutes, right from Claude!

## ⚡ Quick Start - Load Your Extension in 30 Seconds

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - OR click the puzzle icon → "Manage Extensions"

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

3. **Load Your Extension**
   - Click "Load unpacked"
   - Select the `/home/user/yukki/chrome-extension` folder
   - Done! Your extension is live!

4. **See It In Action**
   - Click the puzzle icon in Chrome toolbar
   - Pin your "Quick Tool Builder" extension
   - Click the extension icon to open the popup
   - Visit any website and try the buttons!

## 🎨 Creating Icons (One-time Setup)

Your extension needs icons. Here's the fastest way:

**Option 1: Auto-generate (Recommended)**
```bash
cd /home/user/yukki/chrome-extension/icons
# Open create-icons.html in Chrome browser
# It will auto-download 3 icon files
```

**Option 2: Use any PNG images**
- Just add three PNG files: `icon16.png`, `icon48.png`, `icon128.png`
- Use any image editor or online tool
- Sizes: 16x16, 48x48, 128x128 pixels

**Option 3: Use placeholder emoji icons (Quick & Dirty)**
- The extension will work without icons (Chrome shows a default)
- Add proper icons later when you want to polish

## 🔄 Development Workflow

### Make Changes
1. Edit any file in `/home/user/yukki/chrome-extension/`
2. Tell Claude what you want to change

### Preview Changes
1. Go to `chrome://extensions/`
2. Click the refresh icon ↻ on your extension
3. Test your changes immediately!

### Iterate Fast
- No build step needed
- No deployment required
- Changes are instant with a simple refresh

## 📁 File Structure

```
chrome-extension/
├── manifest.json      # Extension config (required)
├── popup.html         # Popup UI when you click extension icon
├── popup.js          # Popup logic
├── content.js        # Runs on every webpage
├── background.js     # Background service worker
├── styles.css        # Popup styling
├── icons/            # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md         # This file
```

## 💡 What Can You Build?

### Easy Wins (5-10 minutes)
- **Link extractor** - Extract all links from a page
- **Text highlighter** - Highlight keywords on any site
- **Dark mode toggle** - Add dark mode to any website
- **Screenshot tool** - Capture parts of pages
- **Word counter** - Count words on any page

### Medium Projects (30-60 minutes)
- **LinkedIn scraper** - Extract profile data
- **Price tracker** - Monitor product prices
- **Email finder** - Find emails on websites
- **Form filler** - Auto-fill forms
- **Todo list** - Personal task manager

### Advanced (2+ hours)
- **AI writing assistant** - Enhance text with AI
- **Analytics dashboard** - Track your browsing
- **Tab manager** - Organize browser tabs
- **API integration** - Connect to Supabase, Firebase, etc.

## 🛠️ Common Modifications

### Change Extension Name
Edit `manifest.json`:
```json
"name": "Your Cool Tool Name"
```

### Add New Popup Button
Edit `popup.html` (add button) and `popup.js` (add click handler)

### Run Code on Specific Sites Only
Edit `manifest.json`:
```json
"content_scripts": [{
  "matches": ["https://linkedin.com/*"],
  ...
}]
```

### Add External API
Just use `fetch()` in your JavaScript files!

### Store Data
Use Chrome's built-in storage:
```javascript
// Save
chrome.storage.local.set({ key: 'value' });

// Load
chrome.storage.local.get(['key'], (result) => {
  console.log(result.key);
});
```

## 🐛 Debugging

### View Console Logs
- **Popup**: Right-click popup → "Inspect"
- **Background**: Extensions page → "Inspect views: background page"
- **Content Script**: Regular page DevTools Console

### Extension Not Working?
1. Check `chrome://extensions/` for errors (red text)
2. Click "Errors" button to see details
3. Make sure Developer Mode is ON
4. Try reloading the extension

### Changes Not Showing?
- Always click the refresh ↻ button after editing files
- For content scripts, also refresh the webpage

## 📦 Publishing (Optional)

When you're ready to share:

1. **Package Your Extension**
   - Zip the `chrome-extension` folder
   - Remove `README.md` and `create-icons.html` from zip

2. **Monetize Options**
   - Gumroad (easy for selling)
   - ExtensionPay (subscriptions)
   - Chrome Web Store ($5 one-time fee)

3. **Or Keep It Private**
   - No need to publish!
   - Just use it yourself
   - Share the folder with friends

## 🎯 Next Steps

Ask Claude to:
- "Add a feature that extracts all images from a page"
- "Make it work specifically on LinkedIn"
- "Add a dark mode to the popup"
- "Connect this to Supabase to save data"
- "Add a button that does X on website Y"

Claude can modify any file and you just refresh to see changes!

---

**Built with Claude** 💙 | No hosting needed • No IDE required • Instant preview
