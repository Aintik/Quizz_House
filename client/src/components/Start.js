import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const Start = () => {
   const styles = {
      align: {
         width:"100%",
         textAlign: 'start',
         fontSize:"42px"
      },
      buttonf: {
         marginBottom:"80px"
      } }
   
   const { state } = useLocation();
   const navigate = useNavigate();
   function start(e) {
      e.preventDefault();
      navigate('/test', {state})
   }
   
   useEffect(
      () =>{
         window.localStorage.setItem('deadline', new Date(Date.now() + 5400000)) //1h 30min- 5 400 000
      }, []
   )

   
   return (
      <div className="Start container">
         <NavBar link={"/home"} title={ "Asosiy bo'lim" }/>
         <div className="glass auth">
            <div className="close">
            <a href="/home"><FontAwesomeIcon icon={faXmark } /></a>
         </div>
            <form action="">
               <h2 style={styles.align}>{state} bo'yicha Test</h2>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam laboriosam obcaecati consequuntur, architecto cumque repudiandae modi provident at deleniti officiis quas mollitia, commodi saepe, hic minus tempora magnam a.</p>
               <h4>Lorem ipsum dolor sit amet.</h4>
               <p style={styles.buttonf}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam laboriosam obcaecati consequuntur, architecto cumque repudiandae modi provident at deleniti officiis quas mollitia, commodi saepe, hic minus tempora magnam a.</p>
               <a className="button" href="/" onClick={start} >Tasdiqlash</a>
            </form>
         </div>
      </div>
   )
}

export default Start