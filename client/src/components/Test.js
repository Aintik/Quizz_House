import React, { useEffect, useState } from "react";
import NavBar from "./Navbar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Test = () => {
  const styles = {
    but: {
      position: "absolute",
      top: "45px",
      right: "0",
    },
  };
  const [loader, setLoader] = useState(false);
  const [test, setTest] = useState({});
  const [numOf, setNumOf] = useState(1);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const deadline = window.localStorage.getItem("deadline");
  function getTime() {
    let time;
    if (deadline && Date.parse(deadline) >= Date.now()) {
      time = Date.parse(deadline) - Date.now();
    } else finish();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
  }
  function voting(e) {
    if (
      answers.find((e) => {
        return e.id === test[numOf - 1]?._id;
      })
    )
      answers.find((e) => {
        return e.id === test[numOf - 1]?._id;
      }).selected = e.target.value;
    else {
      const prapered = [
        ...answers,
        {
          id: test[numOf - 1]?._id,
          selected: [...document.getElementsByName("test")].find(
            (one) => one.checked === true
          )?.value,
        },
      ];
      setAnswers(prapered);
    }
  }
  function going(now) {
    let t = answers.find((e) => {
      return e.id === test[now]?._id;
    });
    let radios = [...document.getElementsByName("test")];
    radios.forEach((elem) => {
      elem.checked = false;
    });
    if (t && radios.length) {
      radios.find((e) => e.value === t.selected).checked = true;
    }
  }
  function next() {
    setNumOf(numOf + 1);
    going(numOf);
  }
  function before() {
    if (numOf <= 1) setNumOf(1);
    else {
      setNumOf(numOf - 1);
      going(numOf - 2);
    }
  }
  async function catching() {
    setLoader(true)
    const data = await axios.get(
      `https://quizz-app.onrender.com/tests/solve/${state}`,
      {
        headers: {
          "x-access-token": window.localStorage.getItem("TOKEN"),
        },
      }
    );
    setTest(data.data.first30);
    setLoader(false);
  }
  async function finish() {
    setLoader(true);
    let ch = await axios.post(
      "https://quizz-app.onrender.com/tests/check",
      answers
    );
    let sum = ch.data.checking.reduce((a, sum) => a + sum, 0);
    let percentage = Math.round((sum * 100) / test.length);
    await axios.put("https://quizz-app.onrender.com/users/addingCertif", {
      token: window.localStorage.getItem("TOKEN"),
      addCertificate: {
        score: percentage,
        subject: `${state}`,
      },
    });
    navigate("/finish", { state: percentage });
    setLoader(false);
  }
  function goto(e) {
    let a = e.target;
    if (a.tagName === "DIV") a = a.children[0];
    let b = a.innerHTML;
    setNumOf(+b);
    going(+b - 1);
  }
  useEffect(() => {
    catching();
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {loader && <Loader />}
      <div className="Test container">
        <NavBar />
        <button style={styles.but} type="submit" onClick={finish}>
          Tugatish
        </button>
        <div className="position">
          {Array.apply(0, Array(test.length)).map((elem, index) => {
            index++;
            return (
              <div className="div" key={index} onClick={goto}>
                <h1>{index}</h1>
              </div>
            );
          })}
        </div>
        <div>
          <div className="glass auth">
            <h2 className="num">{numOf}</h2>
            {test && <h4>{test[numOf - 1]?.question}</h4>}
            <form action="" className="form-verstical" onChange={voting}>
              <label htmlFor="inp1">
                <input type="radio" value="A" name="test" id="inp1" />
                <div className="rad"></div>
                {test[numOf - 1]?.options[0]}
              </label>

              <label htmlFor="inp2">
                <input type="radio" value="B" name="test" id="inp2" />
                <div className="rad"></div>
                {test[numOf - 1]?.options[1]}
              </label>
              <label htmlFor="inp3">
                <input type="radio" value="C" name="test" id="inp3" />
                <div className="rad"></div>
                {test[numOf - 1]?.options[2]}
              </label>
              <label htmlFor="inp4">
                <input type="radio" value="D" name="test" id="inp4" />
                <div className="rad"></div>
                {test[numOf - 1]?.options[3]}
              </label>
            </form>
          </div>
          <div className="df">
            <button type="button" onClick={before}>
              Oldingisi
            </button>
            <p>{`${hours}:${minutes}`}</p>
            {test[numOf] && (
              <button type="button" onClick={next}>
                Keyingisi
              </button>
            )}
            {!test[numOf] && (
              <button type="button" onClick={finish}>
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
