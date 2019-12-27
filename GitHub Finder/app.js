// Init Github
const github = new Github();
// Init UI
const ui = new UI();

// Get value from form
const searchUser = document.getElementById("searchUser");
searchUser.addEventListener("keyup", e => {
  const userText = e.target.value;

  if (userText !== "") {
    // Make http call
    github.getUser(userText).then(data => {
      if (data.profile.message === "Not Found") {
        // Show error alert
        ui.showAlert("User not found.", "alert alert-danger");
      } else {
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear search form
    ui.clearForm();
  }
});
