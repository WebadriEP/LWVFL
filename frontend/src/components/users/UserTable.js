import { useEffect, useState } from "react"
import UserColumn from "./UserColumn"
import { getUsers } from "../../api/axios"
import axios from "axios"
import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function UserTable() {
  const [users, setUsers] = useState([])

  var cols = []

  const updateUsers = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users/get")
      .then((response) => {
        setUsers(response.data)
      })
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users/get")
      .then((response) => {
        setUsers(response.data)
      })
  }, [])
  for (var i = 0; i < users.length; i++) {
    const test = cols.push(
      <UserColumn key={i} user={users[i]} updateUsers={updateUsers} />
    )
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          paddingBottom: "2vh",
        }}
      >
        <Button as={Link} to="/create" colorScheme="blue" bg="black">
          Create Account
        </Button>
      </div>

      {cols}
    </div>
  )
}
