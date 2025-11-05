import React, { useState } from "react";
import NavBar from "./Navbar/NavBar";
import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import Loader from "./Loader";

const AuthPage = () => {
  const [loader, setLoader] = useState(false);
  const { loading } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [mes, setMes] = useState("");

  const changeHandler = (event) => {
    setMes("");
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      setLoader(true);
      const data = await axios.post(
        "https://quizz-app.onrender.com/users/signin",
        { ...form }
      );
      if (data.data?.token) {
        window.localStorage.setItem("TOKEN", data.data?.token);
        window.location.replace("/");
      }
      setMes(data.data.massage);
      setLoader(false);
    } catch (e) {}
  };

  return (
    <>
      {loader && <Loader />}
      <div className="AuthPage container">
        <NavBar title={"Sign In"} link={"/register"} />
        <div className="glass auth">
          <form action="">
            <h4>{mes}</h4>
            <h4>Profilga kirish</h4>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={changeHandler}
            />
            <input
              type="password"
              placeholder="Parol"
              name="password"
              onChange={changeHandler}
            />
            <div>
              <a href="/register" disabled={loading}>
                Profilingiz yo'qmi ?
              </a>
            </div>
            <button type="button" onClick={registerHandler} disabled={loading}>
              Tasdiqlash
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
