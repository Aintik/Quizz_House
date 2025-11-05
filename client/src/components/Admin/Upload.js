import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import axios from "axios";
import "../../App.css";
import "./Admin.css";
import Loader from "../Loader";
const Upload = () => {
  const [loader, setLoader] = useState(false);

  async function send(e) {
    setLoader(true)
    let file = document.getElementById("testFile").files[0];
    let fd = new FormData();
    let subject = [...document.getElementsByName("test")]?.find(
      (e) => e.checked
    )?.value;
    console.log(subject);
    fd.append("test", file);
    fd.append("sub", subject);
    await axios.post("https://quizz-app.onrender.com/tests/", fd);
    setLoader(false);
  }
  function chekAdmin() {
    const key = window.localStorage.getItem("rightsKey");
    if (key !== "4&idUD9l0*p8") window.location.replace("/authAdmin");
  }

  useEffect(() => {
    chekAdmin();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="Upload container">
        <NavBar link={"/admin"} title={"Asosiy bo'lim"} />
        <div className="glass">
          <form action="" encType="multipart/form-data">
            <input type="file" id="testFile" accept=".txt, .json" />
            <label htmlFor="inp1">
              <input type="radio" value="Math" name="test" id="inp1" />
              <div className="rad"></div>
              Matematika
            </label>
            <label htmlFor="inp2">
              <input type="radio" value="Physics" name="test" id="inp2" />
              <div className="rad"></div>
              Fizika
            </label>
            <label htmlFor="inp3">
              <input type="radio" value="Biology" name="test" id="inp3" />
              <div className="rad"></div>
              Biologiya
            </label>
            <label htmlFor="inp4">
              <input type="radio" value="Geography" name="test" id="inp4" />
              <div className="rad"></div>
              Geografiya
            </label>
            <button className="button" type="button" onClick={send}>
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
