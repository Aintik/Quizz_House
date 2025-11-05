import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen as icon,
  faUpload as icon2,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import "./Admin.css";
import axios from "axios";
import Loader from "../Loader";
const Admin = () => {
  const [school, setSchool] = useState([]);
  const [loader, setLoader] = useState(false);
  async function catching() {
    setLoader(true)
    let { data } = await axios.get(
      "https://quizz-app.onrender.com/users/schools"
    );
    setSchool([...data.data]);
    setLoader(false)
  }
  function chekAdmin() {
    const key = window.localStorage.getItem("rightsKey");
    if (key !== "4&idUD9l0*p8") window.location.replace("/authAdmin");
  }
  function logOut() {
    window.localStorage.removeItem("rightsKey");
    window.location.replace("/home");
  }
  useEffect(() => {
    chekAdmin();
    catching();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="Admin container">
        <button onClick={logOut}>Log out</button>
        <NavBar
          link={"/admin/edit"}
          link2={"/admin/upload"}
          title={<FontAwesomeIcon icon={icon} />}
          title2={<FontAwesomeIcon icon={icon2} />}
        />
        <div className="gb">
          {school.map((one, index) => {
            return (
              <a
                key={index}
                href={`/admin/school/${one?._id}`}
                className="buttona"
              >
                {one?._id}-maktab <span>{one?.total}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Admin;
