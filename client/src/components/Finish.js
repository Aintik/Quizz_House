import React, { useEffect } from 'react'
import NavBar from './Navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
const Finish = () => {
   const styles = {
      align: {
         width:"100%",
         textAlign: 'center',
         fontSize:"62px"
      },
      buttonf: {
         marginBottom:"80px"
      }
   }
   let {state} = useLocation()
   if (!state) state = 0;
   useEffect(() => {
      window.localStorage.removeItem("deadline");
   }, [])

   return (
      <div className="Finish container">
         <NavBar link={"/home"} title={ "Asosiy bo'lim" }/>
         <div className="glass auth">
         <a href="/home"><FontAwesomeIcon icon={faXmark } className="close" /></a>
            <form action="">
               <h4>Test yakunlandi</h4>
               <h2 style={styles.align}>{state}%</h2>
               <p>Lorem ipsum dolor aminus tempora magnam a.</p>
               <p style={styles.buttonf}>Lorem ipsum doloequuntur, architecto chic minus tempora magnam a.</p>
               <a className="button" href="/home">Sertifikatni olish</a>
            </form>
         </div>
      </div> 
   )
}

export default Finish