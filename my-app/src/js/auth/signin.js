import { supabase, successNotification, errorNotification } from "../main";

const form_signin = document.getElementById("form_signin");

form_signin.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  document.querySelector("#form_signin button").disabled = true;
  document.querySelector(
    "#form_signin button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_signin);

  // Supabase Sigin
  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Get data for session and user
  let session = data.session;
  let user = data.user;

  // If User can be accessed; Or user is already verified
  if (session != null) {
    // Store tokens for API
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);
  }

  if (error == null) {
    // Show Notification
    successNotification("Login Successfully!");

    // Redirect to dashboard
    window.location.pathname = "/home.html";
  } else {
    errorNotification("Something went wrong. Cannot login account.", 10);
    console.log(error);
  }

  // Reset Form
  form_signin.reset();

  // Enable Submit Button
  document.querySelector("#form_signin button").disabled = false;
  document.querySelector("#form_signin button").innerHTML = `Login`;
};
