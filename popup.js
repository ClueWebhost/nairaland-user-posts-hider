function saveHiddenUsers(hiddenUsers) {
  chrome.storage.local.set({ hiddenUsers: Array.from(hiddenUsers) });
}

function removeUserFromHiddenUsers(username, listItem) {
  chrome.storage.local.get("hiddenUsers", (data) => {
    const hiddenUsers = data.hiddenUsers ? new Set(data.hiddenUsers) : new Set();
    hiddenUsers.delete(username);
    saveHiddenUsers(hiddenUsers);
    listItem.remove();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
  });
  });
}

function createShowButton(username, listItem) {
  const showBtn = document.createElement('button');
  showBtn.innerText = 'Show Posts';
  showBtn.style.marginLeft = '5px';
  showBtn.addEventListener('click', () => {
    removeUserFromHiddenUsers(username, listItem);
  });
  return showBtn;
}

function displayHiddenUsers(hiddenUsers) {
  const hiddenUsersList = document.getElementById('hidden-users-list');
  if (hiddenUsers.size === 0) {
    hiddenUsersList.innerHTML = '<li>No hidden users found.</li>';
  } else {
    hiddenUsersList.innerHTML = '';
    hiddenUsers.forEach((username) => {
      const listItem = document.createElement('li');
      listItem.textContent = username;
      const showBtn = createShowButton(username, listItem);
      listItem.appendChild(showBtn);
      hiddenUsersList.appendChild(listItem);
    });
  }
}

chrome.storage.local.get("hiddenUsers", (data) => {
  const hiddenUsers = data.hiddenUsers ? new Set(data.hiddenUsers) : new Set();
  displayHiddenUsers(hiddenUsers);
});




// function updatePopup(hiddenUsers) {
//   const userList = document.getElementById("hidden-users-list");

//   hiddenUsers.forEach((user) => {
//     const listItem = document.createElement("li");
//     listItem.innerText = user;
//     userList.appendChild(listItem);
//   });

//   console.log("Hidden users:", hiddenUsers); // Add this line to log hidden users
// }

// chrome.storage.local.get("hiddenUsers", (data) => {
//   if (data.hiddenUsers) {
//     updatePopup(data.hiddenUsers);
//   } else {
//     console.log("No hidden users found."); // Add this line to log when no hidden users are found
//   }
// });

