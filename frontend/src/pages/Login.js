import { useState } from "react"
import React from "react"

import { useLogin } from "../hooks/useLogin"
import { Container, Heading, Text, Input, Box, Button } from "@chakra-ui/react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, loading, success } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <Container
      p={8}
      maxW="30%"
      borderRadius={10}
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      shadow="xl"
      mt={100}
      mb={150}
    >
      <form className="login" onSubmit={handleLogin}>
        {/* Heading & disclaimer */}
        <Box mb={6}>
          <Heading mb={2}>Log in</Heading>
          <Text fontSize="sm" color="gray.500">
            This app is protected. Please sign in or contact the administrator
            to enable your account.
          </Text>
        </Box>

        {/* Email field */}
        <Box mb={4}>
          <Heading size="md" as="label" for="email" mb={2}>
            Email
          </Heading>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="email@example.com"
          />
        </Box>

        {/* Password field */}
        <Box mb={4}>
          <Heading size="md" as="label" for="password" mb={2}>
            Password
          </Heading>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="********"
          />
        </Box>

        {/* Submit login */}
        <Button disabled={loading} colorScheme="blue" mt={4}>
          Log in
        </Button>

        {/* Error message */}
        {error && <div className="error">{error}</div>}
        {success && (
          <div className="success">
            Logged in successfully! You may now navigate to the other pages.
          </div>
        )}
      </form>
    </Container>
  )
}

export default Login
