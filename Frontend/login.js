const gmailEl = document.getElementById("gmail");
const passwordEl = document.getElementById("password");
const msgContainer = document.getElementById("msg-container");
const msgPara = document.getElementById("msg-para");

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (gmailEl.value != "" && passwordEl.value != "") {
    msgContainer.style.display = "none";
    const obj = {
      gmail: gmailEl.value,
      password: passwordEl.value,
    };
    try {
      const result = await axios.post("http://localhost:4000/user/login", obj);
      //   console.log(result);

      if (result.data.result.password != obj.password) {
        msgPara.textContent = "Password is incorrect.";
        msgContainer.style.display = "block";
      } else {
        gmailEl.value = "";
        passwordEl.value = "";
      }
    } catch (err) {
      msgPara.textContent = "User does not exist.";
      msgContainer.style.display = "block";
      //   console.log(err);
    }
  } else {
    msgPara.textContent = "Please enter all fields.";
    msgContainer.style.display = "block";
  }
});
