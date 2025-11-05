import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as faBin } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import "./Admin.css";
import axios from "axios";
import Loader from "../Loader";
const Edit = () => {
  const drop = {
    height: "auto",
    background:
      "linear-gradient(161.16deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "none",
    backdropFilter: "none",
    border: "none",
    borderRadius: "0",
    padding: "0",
    margin: "0",
    lineHeight: 0,
  };
  const [loader, setLoader] = useState(false);
  const [tests, setTests] = useState([]);
  async function cathcing() {
    setLoader(true)
    const { data } = await axios.get("https://quizz-app.onrender.com/tests");
    setTests(data.data);
    setLoader(false);
  }
  async function del(e) {
    setLoader(true);
    await axios.delete(`https://quizz-app.onrender.com/tests/${e.target.id}`);
    window.location.reload();
    setLoader(false);
  }
  function chekAdmin() {
    const key = window.localStorage.getItem("rightsKey");
    if (key !== "4&idUD9l0*p8") window.location.replace("/authAdmin");
  }
  useEffect(() => {
    chekAdmin();
    cathcing();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <div className="Admin container">
        <NavBar link={"/admin"} title={"Asosiy bo'lim"} />

        {tests.map((e, i) => {
          return (
            <div className="glass edit" key={i}>
              <div className="close">
                <h4 className="sub">{e.subject}</h4>
                <button style={drop} onClick={del} id={e._id}>
                  <FontAwesomeIcon
                    icon={faBin}
                    style={{ pointerEvents: "none" }}
                  />
                </button>
              </div>
              <h3 style={{ color: "white" }}>{e.question}</h3>
              <form action="" className="form-verstical">
                <label htmlFor="inp1">
                  <input type="radio" name="test" id="inp1" />
                  <div className="rad"></div>
                  A. {e.options[0]}
                </label>

                <label htmlFor="inp2">
                  <input type="radio" name="test" id="inp2" />
                  <div className="rad"></div>
                  B. {e.options[1]}
                </label>
                <label htmlFor="inp3">
                  <input type="radio" name="test" id="inp3" />
                  <div className="rad"></div>
                  C. {e.options[2]}
                </label>
                <label htmlFor="inp4">
                  <input type="radio" name="test" id="inp4" />
                  <div className="rad"></div>
                  D. {e.options[3]}
                </label>
              </form>
              <h4>Answer is: {e.answer}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Edit;
