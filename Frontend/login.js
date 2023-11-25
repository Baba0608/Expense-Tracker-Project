const gmailEl = document.getElementById("gmail");
const passwordEl = document.getElementById("password");
const msgPara = document.getElementById("msg-para");

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (gmailEl.value != "" && passwordEl.value != "") {
    msgPara.style.display = "none";
    const obj = {
      gmail: gmailEl.value,
      password: passwordEl.value,
    };
    try {
      const result = await axios.post("http://localhost:4000/user/login", obj);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    msgPara.textContent = "Please enter all fields.";
    msgPara.style.display = "block";
  }
});
