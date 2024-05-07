function setRouter() {
  switch (window.location.pathname) {
    // If you are logged in you cant access outside pages; redirect to home
    case "/":
    case "/index.html":
    case "/signin.html":
    case "/signup.html":
      if (localStorage.getItem("access_token")) {
        window.location.pathname = "/home.html";
      }
      break;

    // If you are not logged in you cant access dashboard pages; redirect to /
    case "/home.html":
    case "/profile.html": // Add more case if there are more pages
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;

    default:
      break;
  }
}

export { setRouter };
