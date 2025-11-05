import React from "react";
import "../../App.css";
import "./Admin.css";
const authAdmin = () => {

  async function giveAdmin() {
    const login = document.getElementsByName("login")[0].value;
    const pass = document.getElementsByName("password")[0].value;
    if (login === "admin" && pass === "admin") {
      console.log("congratulations");
      window.localStorage.setItem("rightsKey", "4&idUD9l0*p8");
      window.location.replace('/admin')
    } else console.log("u are not admin");
  }

  return (
    <div className="Admin container">
        <a href="/home" style={{color:"white"}}>Go to home</a>
      <form action="">
        <h4>Adminga kirish</h4>
        <input
          type="text"
          placeholder="login"
          name="login"
        />
        <input
          type="password"
          placeholder="Parol"
          name="password"
        />
        <div>
        </div>
        <button type="button" onClick={giveAdmin}>
          Tasdiqlash
        </button>
      </form>
    </div>
  );
};

export default authAdmin;