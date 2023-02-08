import { Link } from "react-router-dom";
import React from 'react';
import { Box, Button, ButtonGroup, Flex, Heading, HStack, Spacer } from "@chakra-ui/react"

// Components
import PrimaryButton from "../buttons/PrimaryButton";
import NavLink from "./NavLink";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
// css
import './navStyles.css';

const Navbar = () => {
  const {user} =  useAuthContext()
  const {logout} = useLogout()

  const handleClick = () => {
    logout()
  }

    return (
      <Flex 
          as='nav' 
          justify='space-between' 
          align='center' 
          px='10%' 
          py={2}
          bg='black'
          shadow='md'
        >
          {/* Logo and Links */}
          <HStack alignItems='center' justify='space-between'>
            <Heading 
              as={Link} 
              to='/' 
              size='md' 
              color='white'
              marginRight={5}
              _hover={{
                color: 'blue.500',
              }}
              transition='all 200ms ease-in-out'
            >
              DontraCRM
            </Heading>

            {/* Links */}
            <HStack justifyContent='space-between'>
              <NavLink page='/' text='Dashboard' />
              <NavLink page='/members' text='Members' />
              <NavLink page='/donors' text='Donors' />
              <NavLink page='/engagement' text='Engagement' />
              <NavLink page='/users' text='Users' />

              <NavLink page='/reports' text='Reports' /> 
            </HStack>
          </HStack>

          <Spacer />

          {/* Login / Signup Buttons */}
          {!user && (
          <Box>
            <PrimaryButton page='/login' text='Log In' />
            <ButtonGroup>
              <Button colorScheme='blue' variant='outline'>[DEV] Sign Up</Button>
              <Button colorScheme='blue'>Sign In</Button>
            </ButtonGroup>
          </Box>
        )}

        {/* Handle show logout button when signed in */}
        {user && (
          <Box>             
            <Button onClick={handleClick} colorScheme='red' variant='outline'>Log Out</Button>
          </Box>
        )}
      </Flex>
  );
}

export default Navbar;
