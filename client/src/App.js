import React from 'react'
import './App.css'
import { useRoutes } from './routes'
function App() {
   let TOKEN = window.localStorage.getItem("TOKEN")
   const routes = useRoutes(TOKEN)
   return (
      <div className="App">
         {routes}
      </div>
   );
}

export default App;

