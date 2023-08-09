const form = document.getElementById("form-selector");
const getUserNameInput = document.getElementById("username");
const displayUsername = document.getElementById("display-username"); // Get the display element
const displayUsernameText = document.querySelector(".username-text"); // Get the display element

const jsonData = document.getElementById("display-jsonData");
const avatarImage = document.getElementById("avatar");
const avatarHead = document.getElementById("avatar-head");
const errorMessage = document.getElementById("error-message");
const informationSection = document.querySelector(".information-link-section");
const informationSectionGitLink = document.querySelector(".information-link-section a");
const clear = document.getElementById("clear");

clear.addEventListener("click", function () {
  location.reload(); // Reload the window
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const userName = getUserNameInput.value;
  
  displayUsernameText.style.display = "block";
  displayUsername.textContent = ` ${userName}`;
  

  const response = await fetch(`https://api.github.com/users/${userName}`);

  if (!response.ok) {
    errorMessage.textContent = "Invalid Profile Name - Does not exist on GitHub, please try again"; // Display error message
    avatarImage.src = ""; // Clear the avatar image
    return; // Exit the function
  }

  const returnedData = await response.json();
  jsonData.textContent = `Login: ${returnedData.login}`;
  avatarImage.src = returnedData.avatar_url;
  avatarHead.textContent = `Profile Photo for "${userName}"`;
  informationSection.style.display = "block";
  informationSectionGitLink.href = `https://github.com/${userName}`;

  console.log(returnedData);
});
