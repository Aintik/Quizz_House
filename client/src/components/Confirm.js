import React from 'react'
import NavBar from './Navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const Confirm = () => {
   return (
      <div className="Confirm container">
         <NavBar />
         <div className="glass aQuth">
         <a href="/home"><FontAwesomeIcon icon={faXmark } className="close" /></a>
         <form action="">
            <h4>Telefoningizga yuborilgan raqamlarni kiriting</h4>
            <input type="number" placeholder="12 34" />
            <div>
               <p>12:30</p>
               <a href="hhtps://www.google.com">Qayta jo`natish</a>
            </div>
            <button type="submit">Tasdiqlash</button>
         </form>
      </div>
   </div>
   )
}

export default Confirm