import { donationContext }  from "../context/DonationContext.js";
import { useContext } from "react";


export const useDonationContext = () => {
    const context = useContext(donationContext)

    if(!context){
        throw Error('UseDonationContext must be use inside a DonationContextProvider')
    }

    return context
}

