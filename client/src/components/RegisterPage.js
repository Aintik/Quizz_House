import React, { useState } from "react";
import axios from "axios";
import NavBar from "./Navbar/NavBar";
import Loader from "./Loader";

const getId = (name) => {
  return document.getElementById(name)?.value;
};

const RegisterPage = () => {
  const [mes, setMes] = useState();
  const [loader, setLoader] = useState(false);


  function validateInputs() {
    if (
      !getId("name").trim() &&
      !getId("lastName").trim() &&
      !getId("school").trim() &&
      !getId("degree").trim() &&
      !getId("letter").trim() &&
      !getId("email").trim() &&
      !getId("password").trim()
    ) {
      return false;
    }
    return true;
  }
  async function posting(e) {
    setLoader(true)
    if (validateInputs()) {
      const body = {
        name: getId("name"),
        surname: getId("lastName"),
        school: getId("school"),
        class: {
          degree: getId("degree"),
          letter: getId("letter"),
        },
        email: getId("email"),
        password: getId("password"),
      };
      const data = await axios.post(
        "https://quizz-app.onrender.com/users",
        body
      );
      if (data.data.message === "User craeted")
        window.location.replace("/auth");
      else setMes(data.data.message);
    } else setMes("fill the form");
    setLoader(false)
  }

  return (
    <>
      {loader && <Loader/>}
      <div className="Register container">
        <NavBar title={"Sign Up"} link={"/auth"} />
        <div className="glass auth">
          <form>
            <h4>Ro'yhatdan o'tish</h4>
            <input type="text" placeholder="Ism" id="name" />
            <input type="text" placeholder="Familiya" id="lastName" />
            <input type="number" placeholder="Maktab" id="school" />
            <input type="number" placeholder="Maktab sinf" id="degree" />
            <input type="string" placeholder="Sinf xarfi" id="letter" />
            <input type="email" placeholder="Email" id="email" />
            <input type="password" placeholder="Parol" id="password" />
            <input
              type="password"
              placeholder="Parolni qayta kiriting"
              id="password2"
            />
            <div>
              <a href="/auth">Profilingiz bormi ?</a>
            </div>
            <button type="button" onClick={posting}>
              Tasdiqlash
            </button>
            <h4>{mes}</h4>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
