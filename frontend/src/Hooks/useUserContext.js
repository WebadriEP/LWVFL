import { UserContext }  from "../Context/userContext.js";
import { useContext } from "react";


export const UseUserContext = () => {
    const context = useContext(UserContext)

    if(!context){
        throw Error('UseUserContext must be use inside a UserContextProvider')
    }

    return context
}
