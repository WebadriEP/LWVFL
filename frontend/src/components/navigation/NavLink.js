import { Link } from "react-router-dom"
import React from "react"
import { Text } from "@chakra-ui/react"

const NavLink = (props) => {
  const { page, text } = props

  return (
    <Link to={page}>
      <Text
        color="white"
        p={3}
        _hover={{
          color: "blue.400",
        }}
        transition="all 200ms ease-in-out"
      >
        {text}
      </Text>
    </Link>
  )
}

export default NavLink
