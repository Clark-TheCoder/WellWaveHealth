fetch("/html/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;

    const menuIcon = document.getElementById("menu_icon");
    const navigationContainer = document.getElementById("navigation_container");
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("show_menu");
      navigationContainer.classList.toggle("show_nav");
    });

    navigationContainer.addEventListener("mouseleave", () => {
      menuIcon.classList.toggle("show_menu");
      navigationContainer.classList.toggle("show_nav");
    });
  })
  .catch((error) => {
    console.error("Error loading the nav:", error);
  });
