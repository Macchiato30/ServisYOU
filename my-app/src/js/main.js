// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import { setRouter } from "./router/router.js";

// Import Supabase
import { createClient } from "@supabase/supabase-js";

// set router
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://zslphlqneckdehsvqymy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbHBobHFuZWNrZGVoc3ZxeW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4MjUyODMsImV4cCI6MjAyODQwMTI4M30.eC4io1_ZTCtwhAOTTi-t6p9iEfadRkbbw6e30_Dmx8k"
);

// Success Notification
function successNotification(message, seconds = 0) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Error Notification
function errorNotification(message, seconds = 0) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Logout Function
async function doLogout() {
  // Supabase Logout
  let { error } = await supabase.auth.signOut();

  if (error == null) {
    // Clear local Storage
    localStorage.clear();

    // Redirect to login page
    window.location.pathname = "/index.html";
  } else {
    errorNotification("Logout Failed!", 15);
  }
}

export { supabase, successNotification, errorNotification, doLogout };
