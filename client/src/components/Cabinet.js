import React, { useEffect, useState } from "react";
import NavBar from "./Navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "./Loader";

const Cabinet = () => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [mes, setMes] = useState("");
  async function usering() {
    setLoader(true)
    const data = await axios.get("https://quizz-app.onrender.com/users/one", {
      headers: {
        "x-access-token": window.localStorage.getItem("TOKEN"),
      },
    });
    setUser(data.data?.data);
    setLoader(false)
  }
  async function loadCertif(e) {
    setLoader(true)
    let sub = e.target.parentElement.textContent;
    if (!sub) sub = e.target.parentElement.parentElement.textContent;
    const data = await axios.post(
      "https://quizz-app.onrender.com/users/giveCertif",
      {
        sub,
        token: window.localStorage.getItem("TOKEN"),
      },
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Certificate.pdf");
    document.body.append(link);
    link.click();
    setLoader(false)
  }
  async function update() {
    setLoader(true)
    const isEmpty = (str) => {
      const item = document.getElementById(str)?.value;
      if (item.trim().length) return item;
    };
    const body = {
      school: isEmpty("school"),
      email: isEmpty("email"),
      password: isEmpty("password"),
      token: window.localStorage.getItem("TOKEN"),
    };
    if (document.getElementById("password")?.value?.trim())
      body.checkPassword = await prompt("Old password");
    const { data } = await axios.put(
      "https://quizz-app.onrender.com/users",
      body
    );
    if (data.pasChanged === true) {
      await usering();
      window.location.replace("/cabinet");
    } else setMes("wrong password");
    setLoader(false)
  }

  useEffect(() => {
    usering();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="Cabinet container">
        <NavBar link={"/home"} title={"Asosiy bo'lim"} />
        <div className="glass auth">
          <form action="">
            <h2>
              {user.surname} {user.name}
            </h2>
            <p>
              {user.class?.degree} - {user.class?.letter} sinf o`qivchisi
            </p>
            <input
              id="school"
              type="number"
              placeholder={`${user.school} school`}
            />
            <input id="email" type="email" placeholder={user.email} />
            <input id="password" type="text" placeholder="parol" />
            <button type="button" onClick={update}>
              Tasdiqlash
            </button>
            <h4>{mes}</h4>
            <h2>Sertifikatlar</h2>
            {user.certificates?.map((elem, index) => {
              return (
                <h5 key={index}>
                  {elem.subject}
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="download"
                    onClick={loadCertif}
                  />
                </h5>
              );
            })}
          </form>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
      </div>
    </>
  );
};

export default Cabinet;
