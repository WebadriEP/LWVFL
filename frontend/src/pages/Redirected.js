import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const Redirected = () => {

    const navigate = useNavigate()
    const id = useParams()
    const homelink = "/member/" + id
    useEffect(() => {navigate(homelink)})

}


export default Redirected