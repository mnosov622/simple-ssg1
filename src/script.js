const darkIcon = document.querySelector(".dark");
const postCards = document.querySelectorAll(".posts__post");
const lightIcon = document.querySelector(".light");
const body = document.body;
const content = document.querySelector(".content");
const darkModeEnabled = localStorage.getItem("darkmode");

let darkMode = false;

if (darkModeEnabled === "true") {
  if (content) {
    content.classList.add("content-dark-mode");
  }
  body.classList.add("dark-mode");
  darkIcon.style.display = "none";
  lightIcon.style.display = "block";
  postCards.forEach((postCard) => {
    postCard.classList.add("cards__dark-mode");
  });
}

darkIcon.addEventListener("click", () => {
  darkMode = true;
  localStorage.setItem("darkmode", true);

  if (content) {
    content.classList.add("content-dark-mode");
  }
  body.classList.add("dark-mode");
  darkIcon.style.display = "none";
  lightIcon.style.display = "block";
  postCards.forEach((postCard) => {
    postCard.classList.add("cards__dark-mode");
  });
});

lightIcon.addEventListener("click", () => {
  darkMode = false;
  localStorage.setItem("darkmode", false);
  if (content) {
    content.classList.remove("content-dark-mode");
  }
  body.classList.remove("dark-mode");
  darkIcon.style.display = "block";
  lightIcon.style.display = "none";
  postCards.forEach((postCard) => {
    postCard.classList.remove("cards__dark-mode");
  });
});
