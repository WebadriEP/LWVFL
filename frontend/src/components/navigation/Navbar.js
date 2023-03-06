import { Link } from "react-router-dom"
import React from "react"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react"

// Components
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"
import NavLink from "./NavLink"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"
// css
import "./navStyles.css"

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      px="10%"
      py={2}
      bg="black"
      shadow="md"
    >
      {/* Logo and Links */}
      <HStack alignItems="center" justify="space-between">
        <Heading
          as={Link}
          to="/"
          size="md"
          color="white"
          marginRight={5}
          _hover={{
            color: "blue.500",
          }}
          transition="all 200ms ease-in-out"
        >
          DontraCRM
        </Heading>

        {/* Links */}
        <HStack justifyContent="space-between">
          <NavLink page="/" text="Dashboard" />
          <NavLink page="/members" text="Members" />
          <NavLink page="/engagement" text="Engagement" />
          <NavLink page="/reports" text="Reports" />
          <NavLink page="/import" text="Import" />
        </HStack>
      </HStack>

      <Spacer />

      {/* Login / Signup Buttons */}
      {!user && (
        <Box>
          <PrimaryButton page="/login" text="Log In" />
        </Box>
      )}

      {/* Handle show logout button when signed in */}
      {user && (
        <Box>
          <Button onClick={handleClick} colorScheme="blue" variant="solid">
            {/* font-awesome icon for exit */}
            <i className="fa fa-sign-out"></i>
          </Button>
        </Box>
      )}
    </Flex>
  )
}

export default Navbar
