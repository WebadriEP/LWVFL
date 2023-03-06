import {
  Button,
  Box,
  SimpleGrid,
  Heading,
  Input,
  Text,
  FormControl,
  IconButton,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { importMembers } from "../api/axios"

const Imports = () => {
  const [platform, setPlatform] = useState("")

  const updatePlatform = (platformFromChild) => {
    setPlatform(platformFromChild)
  }

  // send CSV to backend
  const handleSubmit = async (e) => {
    console.log("submitting")
    console.log(e.target.file.files[0])
    // use axios to send CSV to "/api/members/import"
    await importMembers(e.target.file.files[0])
  }

  return (
    <>
      <Heading>Import Members</Heading>
      <Text>The only supported format is CSV.</Text>

      {!platform ? (
        /* 
        Pre-import View -- Completely useless as we don't have any data from either 
        platform to show. Only there to make the platform feel more complete. 
        */
        <SimpleGrid templateColumns="1fr 1fr" gap={5} marginY={8}>
          <Box
            onClick={setPlatform("salesforce")}
            bg="gray.100"
            borderRadius={8}
            p={8}
            textAlign="center"
            cursor="pointer"
          >
            <Text>Salesforce</Text>
          </Box>
          <Box
            onClick={setPlatform("neon")}
            bg="gray.100"
            borderRadius={8}
            p={8}
            textAlign="center"
            cursor="pointer"
          >
            <Text>Neon</Text>
          </Box>
        </SimpleGrid>
      ) : (
        <>
          <Heading size="sm" marginY={8}>
            SELECTED: {platform.toUpperCase()}
          </Heading>

          {/* File upload */}
          <FormControl marginY={8} onSubmit={handleSubmit}>
            <Input type="file" name="csvFile" isRequired />
            <IconButton type="submit" colorScheme="blue">
              <i className="fa fa-upload"></i>
            </IconButton>
          </FormControl>
        </>
      )}
    </>
  )
}

export default Imports
