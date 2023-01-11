// Content script that runs on nairaland.com pages

// Get all usernames on the page
const usernames = new Set();
const postElements = document.querySelectorAll('td.bold.l.pu a.user');
postElements.forEach(element => {
  usernames.add(element.textContent);
});

// Send usernames to the popup
chrome.runtime.sendMessage({ usernames: [...usernames] });

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'hidePosts') {
    // Hide all posts belonging to the specified username
    const username = request.username;
    postElements.forEach(element => {
      if (element.textContent === username) {
        const postId = element.closest('tr').nextElementSibling.id.substring(2);
        document.getElementById(`pb${postId}`).style.display = 'none';
      }
    });
  }
});

 // Receive usernames from the content script
  chrome.runtime.sendMessage({ action: 'getUsernames' }, function (response) {
    const usernames = response.usernames;
    const usernamesContainer = document.getElementById('usernames');

    // Add a "hide posts" button for each username
    usernames.forEach(username => {
      const button = document.createElement('button');
      button.textContent = `Hide posts by ${username}`;
      button.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'hidePosts', username: username });
      });
