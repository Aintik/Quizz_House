import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import axios from "axios";
import "../../App.css";
import "./Admin.css";
import Loader from "../Loader";
const School = () => {
  const [nums, setNums] = useState([]);
  const [clas, setClas] = useState([]);
  const [loader, setLoader] = useState(false);
  let { id } = useParams();
  async function catching() {
    setLoader(true);
    const data = await axios.get(
      `https://quizz-app.onrender.com/users/black/${id}`
    );
    const data2 = await axios.get(
      `https://quizz-app.onrender.com/users/schools/${id}`
    );
    setNums(data.data.arr);
    setClas(data2.data.data);
    setLoader(false);
  }
  function chekAdmin() {
    const key = window.localStorage.getItem("rightsKey");
    if (key !== "4&idUD9l0*p8") window.location.replace("/authAdmin");
  }
  const total = nums.reduce((sum, e) => e.value + sum, 0);
  useEffect(() => {
    chekAdmin();
    catching();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="Admin container">
        <NavBar link={"/admin"} title={"Asosiy bo'lim"} />

        {nums.map((elem, i) => {
          return (
            <div className="status" key={i}>
              <div className="text">
                <p>{elem.sub}</p>
                <p>{elem.value}</p>
              </div>
              <div className="filter">
                <div style={{ width: `${(elem.value * 100) / total}%` }}></div>
              </div>
            </div>
          );
        })}

        <h2>Sinflar</h2>
        <div>
          <div className="gb">
            {clas.map((elem, i) => {
              return (
                <a
                  href={`/admin/school/${id}/sinf/${elem._id?.degree}-${elem._id?.letter}`}
                  className="buttona"
                  key={i}
                >
                  {elem._id?.degree}
                  {elem._id?.letter} <span>{elem.total}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default School;
