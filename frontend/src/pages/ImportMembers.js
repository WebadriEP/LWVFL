import {
  Flex,
  Heading,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Navigate to members page
//const navigate = useNavigate()

const ImportMembers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const [errorMessage, setErrorMessage] = useState("")
  const [fileAccepted, setFileAccepted] = useState(false)
  const [fileSize, setFileSize] = useState(null)
  const [file, setFile] = useState([])

  /* Send file to backend */
  const sendFile = () => {
    const data = new FormData()
    data.append("name", file.originalname) // File name
    data.append("file", file[0]) // File

    // Post request
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/upload", data)
      .then((res) => {
        console.log(res)

        // Reset state
        setFile([])
        setFileSize(null)
        setFileAccepted(false)

        // TODO: navigate to members page
        //navigate("/members")
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err)
      })
  }

  /* Dropzone - Handle file acceptance and transfer to backend */
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]) // Set file to state
    setFileSize(acceptedFiles[0].size) // Set file size to display  (in bytes)
    setFileAccepted("File accepted, uploading to database...") // Display success message
  }, [])

  // Dropzone parameters and limits
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/csv",
    multiple: false,
  })

  return (
    <>
      <Heading mb={4}>Import Members</Heading>
      <Box
        shadow="lg"
        p={10}
        borderRadius={10}
        border="1px"
        borderColor="gray.100"
      >
        <Heading
          size="md"
          mb={4}
        >
          File Upload
        </Heading>

        {/* Alert Dialogue */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              {/* Popup Heading */}
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                borderRadius={8}
              >
                Confirm File Upload
              </AlertDialogHeader>

              {/* Popup body */}
              <AlertDialogBody>
                Are you sure you want to upload this file? This action cannot be
                undone.
              </AlertDialogBody>

              {/* Popup footer/actions */}
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={sendFile}
                  ml={3}
                >
                  Upload
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* Dropzone */}
        <Flex
          {...getRootProps()}
          borderWidth="2px"
          borderStyle="dashed"
          borderRadius={8}
          borderColor="gray.400"
          py={16}
          px={8}
          transitionProperty="all"
          transitionDuration="0.2s"
          transitionTimingFunction="ease-in-out"
          minH="30vh"
          justify="center"
          align="center"
          _hover={{
            borderColor: "blue.500",
            cursor: "pointer",
            bg: "gray.50",
          }}
        >
          <input
            {...getInputProps()}
            name="file"
          />
          {isDragActive ? (
            <Text
              color="gray.600"
              textAlign="center"
            >
              Drop the files...
            </Text>
          ) : (
            <Text
              color="gray.600"
              textAlign="center"
            >
              Drop your CSV file here, or click to browse your files. Only .csv
              files will be accepted.
            </Text>
          )}
        </Flex>
        {/* Error message display */}
        {errorMessage && (
          <Alert
            status="error"
            variant="subtle"
            mt={4}
            borderRadius={8}
          >
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        {/* Success message display */}
        {fileAccepted && (
          <Alert
            status="success"
            variant="subtle"
            mt={4}
            borderRadius={8}
          >
            <AlertIcon />
            File added! Size: {Math.floor(fileSize / 1000)} kb. Press the button
            below to complete your upload.
          </Alert>
        )}

        {/* Upload button */}
        <Button
          colorScheme="blue"
          onClick={onOpen}
          mt={8}
        >
          Upload CSV
        </Button>
      </Box>
    </>
  )
}

export default ImportMembers
