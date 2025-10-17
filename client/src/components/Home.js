import React, { useEffect, useState } from "react";
import NavBar from "./Navbar/NavBar";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge as icon } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../App.css";
import Loader from "./Loader";
const Home = () => {
  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  };
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [sub, setSub] = useState([]);
  function start(e) {
    e.preventDefault();
    navigate("/start", { state: e.target.id });
  }
  function checkLength(key) {
    const obj = sub.find((e) => e.subject === key);
    if (obj && obj?.size >= 30) {
      return true;
    } else return false;
  }
  function logOut() {
    window.localStorage.removeItem("TOKEN");
    window.location.replace("/home");
  }
  async function catching() {
    setLoader(true)
    const { data } = await axios.get("https://quizz-app.onrender.com/tests");
    let arr = [];
    let result = [];
    data.data.forEach((elem) => {
      arr.push(elem.subject);
    });
    arr = [...new Set(arr)];
    arr.forEach((item) => {
      const a = data.data.filter((elem) => elem.subject === item);
      const b = {
        size: a.length,
        subject: item,
      };
      result.push(b);
    });
    setSub(result);
    setLoader(false)
  }
  useEffect(() => {
    catching();
  }, []);
  return (
    <>
      {loader && <Loader/>}
      <div className="Home container">
        <button onClick={logOut}>Log Out</button>
        <NavBar
          link={"/cabinet"}
          title={<FontAwesomeIcon icon={icon} className="close" />}
        />
        <div className="glass auth">
          <form action="" style={styles.form}>
            {checkLength("Math") && (
              <>
                <h4 className="mmin">Math</h4>
                <p className="min">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae eos nemo consequatur, quaerat vel doloremque cumque
                  sint perferendis aperiam blanditiis!
                </p>
                <button className="button" id="Math" onClick={start}>
                  Tasdiqlash
                </button>
              </>
            )}
            {checkLength("Physics") && (
              <>
                <div className="hr"></div>
                <h4 className="mmin">Physics</h4>
                <p className="min">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae eos nemo consequatur, quaerat vel doloremque cumque
                  sint perferendis aperiam blanditiis!
                </p>
                <button className="button" id="Physics" onClick={start}>
                  Tasdiqlash
                </button>
              </>
            )}
            {checkLength("Geography") && (
              <>
                <div className="hr"></div>
                <h4 className="mmin">Geography</h4>
                <p className="min">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae eos nemo consequatur, quaerat vel doloremque cumque
                  sint perferendis aperiam blanditiis!
                </p>
                <button className="button" id="Geography" onClick={start}>
                  Tasdiqlash
                </button>
              </>
            )}
            {checkLength("Biology") && (
              <>
                <div className="hr"></div>
                <h4 className="mmin">Biology</h4>
                <p className="min">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae eos nemo consequatur, quaerat vel doloremque cumque
                  sint perferendis aperiam blanditiis!
                </p>
                <button className="button" id="Biology" onClick={start}>
                  Tasdiqlash
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
