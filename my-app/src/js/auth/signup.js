import { supabase, successNotification, errorNotification } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  document.querySelector("#form_register button").disabled = true;
  document.querySelector(
    "#form_register button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;

  const formData = new FormData(form_register);

  if (formData.get("password") == formData.get("password_confirmation")) {
    // supabase sign up
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // store into variable user_id
    let user_id = data.user.id;

    // checks and stores user_id into user_information table
    if (user_id != null) {
      const { data, error } = await supabase
        .from("user_information")
        .insert([
          {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            phone_number: formData.get("phone_number"),
            fb_page: formData.get("fb_page"),
            user_id: user_id,
          },
        ])
        .select();

      // Show Notification
      if (error == null)
        successNotification(
          "Registered Successfully! <a href='./signin.html'>Click here to Login!</a>",
          20
        );
      else {
        errorNotification("Something went wrong. Cannot register account.", 10);
        console.log(error);
      }

      // Reset Form
      form_register.reset();

      // Enable Submit Button
      document.querySelector("#form_register button").disabled = false;
      document.querySelector("#form_register button").innerHTML = `Register`;
    }
  }
};
