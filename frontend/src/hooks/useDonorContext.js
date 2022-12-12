import { donorContext }  from "../context/DonorContext.js";
import { useContext } from "react";


export const useDonorContext = () => {
    const context = useContext(donorContext)

    if(!context){
        throw Error('UseDonorContext must be use inside a DonorContextProvider')
    }

    return context
}

