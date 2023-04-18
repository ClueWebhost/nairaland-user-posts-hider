function saveHiddenUsers(hiddenUsers) {
  chrome.storage.local.set({ hiddenUsers: Array.from(hiddenUsers) });
}

function loadHiddenUsers(callback) {
  chrome.storage.local.get('hiddenUsers', (result) => {
    const hiddenUsers = result.hiddenUsers ? new Set(result.hiddenUsers) : new Set();
    callback(hiddenUsers);
  });
}

function hidePosts(username, hiddenUsers) {
  const allRows = document.querySelectorAll('tr');
  let hideNextRow = false;
  let hideSignatureRow = false;

  allRows.forEach((row) => {
    if (hideNextRow) {
      row.style.display = 'none';
      hideNextRow = false;
      hideSignatureRow = true;
    } else if (hideSignatureRow) {
      const signatureElement = row.querySelector('.l.pd.sig.w');
      if (signatureElement) {
        row.style.display = 'none';
      }
      hideSignatureRow = false;
    }

    if (row.querySelector('.grad')) {
      return; // skip hiding the header row
    }

    const userElement = row.querySelector(`a.user[href="/${username}"]`);
    if (userElement) {
      row.style.display = 'none';
      hideNextRow = true;
    }
  });


  hiddenUsers.add(username);
  saveHiddenUsers(hiddenUsers);
}


function createHideButton(username, hiddenUsers) {
  const hideBtn = document.createElement('button');
  hideBtn.innerText = 'Hide Posts';
  hideBtn.style.marginLeft = '5px';
  hideBtn.addEventListener('click', () => {
    hidePosts(username, hiddenUsers);
  });
  return hideBtn;
}

function addHideButtonsToUsernames(hiddenUsers) {
  const userLinks = document.querySelectorAll('a.user');
  userLinks.forEach((userLink) => {
    const username = userLink.getAttribute('href').substring(1);
    const hideBtn = createHideButton(username, hiddenUsers);
    userLink.parentNode.insertBefore(hideBtn, userLink.nextSibling);
  });
}

loadHiddenUsers((hiddenUsers) => {
  hiddenUsers.forEach((username) => {
    hidePosts(username, hiddenUsers);
  });

  addHideButtonsToUsernames(hiddenUsers);
});