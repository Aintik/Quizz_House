import axios from "axios"

const apiUrl = "http://localhost:5000/api/"

export const sendUsers = async (data, options) => {
   try {
      console.log(data)
      await axios.post(`${apiUrl}register`, data)
   } catch (error) {
      console.log("Serverda xatolik")
   }
}