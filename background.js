// Background script that listens for messages from the popup and sends messages to the content script

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'hidePosts') {
    // Forward the message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
});
