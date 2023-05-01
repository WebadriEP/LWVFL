import { Link } from "react-router-dom"
import React from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { FiLogOut } from "react-icons/fi"

// Components
import NavLink from "./NavLink"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"

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
      mb={8}
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
          <NavLink page="/donations" text="Donations" />
          <NavLink page="/engagement" text="Engagement" />
          <NavLink page="/users" text="Users" />
        </HStack>
      </HStack>

      <Spacer />

      {/* Login / Signup Buttons */}
      {!user && (
        <Box>
          <Button
            as={Link}
            to="/login"
            colorScheme="blue"
            variant="solid"
            px={6}
          >
            Log In
          </Button>
        </Box>
      )}

      {/* Handle show logout button when signed in */}
      {user && (
        <Box>
          <Button
            onClick={handleClick}
            colorScheme="blue"
            variant="solid"
            rightIcon={<FiLogOut />}
            fontWeight={400}
          >
            Log Out
          </Button>
        </Box>
      )}
    </Flex>
  )
}

export default Navbar
