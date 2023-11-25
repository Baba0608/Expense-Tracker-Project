const nameEl = document.getElementById("username");
const gmailEl = document.getElementById("gmail");
const passwordEl = document.getElementById("password");
const msgEl = document.getElementById("msg");

const signupButton = document.getElementById("signup-btn");

signupButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (nameEl.value != "" && gmailEl.value != "" && passwordEl.value != "") {
    msgEl.style.display = "none";

    obj = {
      username: nameEl.value,
      gmail: gmailEl.value,
      password: passwordEl.value,
    };

    const result = await axios.post("http://localhost:4000/user/signup", obj);
    console.log(result);

    nameEl.value = "";
    gmailEl.value = "";
    passwordEl.value = "";
  } else {
    msgEl.style.display = "block";
  }
});
