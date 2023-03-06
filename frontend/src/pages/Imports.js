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
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // send CSV to backend
  const handleFileUpload = (e) => {
    // use axios to send CSV to "/api/members/import"
    try {
      importMembers(selectedFile)
    } catch {
      console.log("Error uploading file!")
    }
  }

  return (
    <>
      <Heading>Import Members</Heading>

      {/* File upload */}
      <Box shadow="md" p={5}>
        <input type="file" onChange={handleFileChange} name="csvFile" />

        {/* Only show details if a file is selected */}
        {selectedFile ? (
          <Text>
            <strong>File:</strong> {selectedFile.name} (~
            {Math.floor(selectedFile.size / 1024)}mb)
          </Text>
        ) : null}

        <Button
          type="submit"
          colorScheme="blue"
          onClick={handleFileUpload}
          mt={3}
        >
          <Text mr={3} fontWeight="bold">
            Upload
          </Text>
          <i className="fa fa-upload"></i>
        </Button>
      </Box>
    </>
  )
}

export default Imports
