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
