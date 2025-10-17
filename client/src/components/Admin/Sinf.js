import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../App.css";
import "./Admin.css";
import Loader from "../Loader";
const Sinf = () => {
  const { id, grade } = useParams();
  const [info, setInfo] = useState({});
  const [loader, setLoader] = useState(false);

  async function catching() {
    setLoader(true);
    const { data } = await axios.get(
      `https://quizz-app.onrender.com/users/schools/${id}/${grade}`
    );
    setInfo(data.data);
    setLoader(false);
  }
  function chekAdmin() {
    const key = window.localStorage.getItem("rightsKey");
    if (key !== "4&idUD9l0*p8") window.location.replace("/authAdmin");
  }

  useEffect(() => {
    chekAdmin();
    catching();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <div className="Admin container">
        <NavBar link={"/admin"} title={"Asosiy bo'lim"} />
        {info.Math?.length && (
          <>
            <div className="sinf">
              <h2>Math</h2>
            </div>
            <div className="glass">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {info.Math?.map((elem, i) => {
                    return (
                      <tr key={i}>
                        <td>{`${elem.name} ${elem.surname}`}</td>
                        <td>{elem.score}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {info.Physics?.length && (
          <>
            <div className="sinf">
              <h2>Physics</h2>
            </div>
            <div className="glass">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {info.Physics?.map((elem, i) => {
                    return (
                      <tr key={i}>
                        <td>{`${elem.name} ${elem.surname}`}</td>
                        <td>{elem.score}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {info.Geography?.length && (
          <>
            <div className="sinf">
              <h2>Geography</h2>
            </div>
            <div className="glass">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {info.Geography?.map((elem, i) => {
                    return (
                      <tr key={i}>
                        <td>{`${elem.name} ${elem.surname}`}</td>
                        <td>{elem.score}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {info.Biology?.length && (
          <>
            <div className="sinf">
              <h2>Biology</h2>
            </div>
            <div className="glass">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {info.Biology?.map((elem, i) => {
                    return (
                      <tr key={i}>
                        <td>{`${elem.name} ${elem.surname}`}</td>
                        <td>{elem.score}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sinf;
