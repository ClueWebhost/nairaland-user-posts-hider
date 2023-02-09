const usernames = new Set();
const posts = new Map();

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeName === "TD" && node.classList.contains("bold")) {
        const username = node.getElementsByClassName("user")[0].textContent;
        usernames.add(username);

        const postId = node.getElementsByTagName("a")[0].getAttribute("name");
        const postContent = document.getElementById(`pb${postId}`);
        posts.set(postId, { username, postContent });

        const hideButton = document.createElement("button");
        hideButton.textContent = "Hide Posts";
        hideButton.style.marginLeft = "5px";
        hideButton.addEventListener("click", () => {
          posts
            .forEach(({ username: postUsername, postContent }, postId) => {
              if (postUsername === username) {
                postContent.style.display = "none";
                posts.delete(postId);
              }
            });
        });

        node.appendChild(hideButton);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
