import React from 'react'
import Logo from "../../Svg/ithouse.svg";
import "./NavBar.css"

const NavBar = (props) => {
   return (
      <div>
         <div className="logo">
            <img src={Logo} alt="logo"/>
            <div>
               <a href={props.link} className="logo_beside">{ props.title }</a>
               <a href={props.link2} className="logo_beside">{ props.title2 }</a>
            </div>
         </div>
      </div>
   )
}

export default NavBar