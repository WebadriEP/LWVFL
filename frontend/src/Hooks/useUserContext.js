import { UserContext }  from "../Context/userContext";
import{useContext} from "react";

export const useUsersContext = () => {
    const context = useContext(WorkoutContext)

    if(!context){
        throw Error('must be use inside a UsersContextProvider')
    }

    return context
}
