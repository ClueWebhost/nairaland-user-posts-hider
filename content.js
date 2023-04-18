function hidePosts(username) {
  const allRows = document.querySelectorAll('tr');
  let hideNextRow = false;

  allRows.forEach((row) => {
    if (hideNextRow) {
      row.style.display = 'none';
      hideNextRow = false;
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
}


function createHideButton(username) {
  const hideBtn = document.createElement('button');
  hideBtn.innerText = 'Hide Posts';
  hideBtn.style.marginLeft = '5px';
  hideBtn.addEventListener('click', () => {
    hidePosts(username);
  });
  return hideBtn;
}

function addHideButtonsToUsernames() {
  const userLinks = document.querySelectorAll('a.user');
  userLinks.forEach((userLink) => {
    const username = userLink.getAttribute('href').substring(1);
    const hideBtn = createHideButton(username);
    userLink.parentNode.insertBefore(hideBtn, userLink.nextSibling);
  });
}

addHideButtonsToUsernames();
