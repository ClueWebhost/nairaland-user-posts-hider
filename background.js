// Background script that listens for messages from the popup and sends messages to the content script

// Listen for the popup being opened
chrome.browserAction.onClicked.addListener(function() {
  // Query the DOM to find all of the usernames
  var usernames = Array.from(document.querySelectorAll('.user')).map(function(el) {
    return el.textContent;
  });

  // Remove any duplicates from the usernames list
  usernames = Array.from(new Set(usernames));

  // Send the list of usernames to the popup
  chrome.runtime.sendMessage({
    type: 'usernames',
    data: usernames
  });
});


// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'hidePosts') {
    // Forward the message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
});
