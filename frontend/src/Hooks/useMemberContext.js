import { MemberContext }  from "../Context/MemberContext.js";
import { useContext } from "react";


export const useMemberContext = () => {
    const context = useContext(MemberContext)

    if(!context){
        throw Error('UseMemberContext must be use inside a MemberContextProvider')
    }

    return context
}

