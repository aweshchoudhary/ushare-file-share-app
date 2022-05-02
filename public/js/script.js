const toast = (message) => {
  console.log("click");
  const toastBox = document.querySelector("#toast");
  const toastInput = document.querySelector("#toastInput");
  toastInput.value = message;
  toastBox.style.right = 0;
  setTimeout(() => {
    toastBox.style.right = "-100%";
    toastInput.value = "";
  }, 3000);
};

// theme mode
function theme() {
  const theme = localStorage.getItem("theme");
  console.log("clicked");
  if (theme === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  changeTheme();
}
function changeTheme() {
  const theme = localStorage.getItem("theme");
  const rootElement = document.documentElement;
  if (theme === "dark") {
    rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }
}

changeTheme();
