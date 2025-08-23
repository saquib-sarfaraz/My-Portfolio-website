document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
  
    if (!themeToggle) {
      console.error("Theme toggle button not found!");
      return;
    }
  
    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
      themeToggle.textContent = "🌙 Dark Mode";
    } else {
      themeToggle.textContent = "🌙 Light Mode";
    }
  
    // Toggle theme on click
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
  
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
      } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙 Light Mode";
      }
    });
  });
  