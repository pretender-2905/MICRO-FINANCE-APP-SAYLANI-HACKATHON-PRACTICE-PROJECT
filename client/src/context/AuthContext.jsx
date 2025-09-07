import { createContext, useEffect, useState } from "react";
import { AppRoutes } from "../constants/constant";
import Cookies from "js-cookie";
import axios from "axios";
export const AuthContext = createContext()

export default function AuthContextProvider({children}){

    const [user, setUser] = useState(null)


    useEffect(()=>{
      if(!user){
         const token = Cookies.get("token")
         if(token){
            getUser()
         }
      }
    }, [user])

    const getUser = ()=>{
      axios.get(AppRoutes.getMyInfo, {
         headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
         }
      })
      .then((res)=>{
         console.log("res from get my info api=> ", res.data)
         setUser(res?.data?.data)
      })
      .catch((error)=>{
         console.log("error from get my info api=> ", error)
      })
    }
   return(
     <AuthContext.Provider value={{user, setUser}}>
        {children}
     </AuthContext.Provider>
   )
}