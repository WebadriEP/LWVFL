import { userContext }  from "../context/userContext.js";
import { useContext } from "react";


export const useUserContext = () => {
    const context = useContext(userContext)

    if(!context){
        throw Error('useUserContext must be use inside a userContextProvider')
    }

    return context
}
