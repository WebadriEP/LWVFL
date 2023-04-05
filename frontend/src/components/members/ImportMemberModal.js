import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  SimpleGrid,
  Box,
  FormLabel,
  Input,
  Select,
  Flex,
  Text,
  Stack,
  Radio,
  RadioGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { FiUpload } from "react-icons/fi"
import { useState } from "react"

function ImportMemberModal() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      return <></>
    } catch (err) {
      setError(err.message)
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
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
      {/* Import button */}
      <Button onClick={onOpen} rightIcon={<FiUpload />} colorScheme="gray">
        Import
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} borderRadius={8} size="md">
        {/* Background overlay */}
        <ModalOverlay />

        {/* Modal content */}
        <ModalContent>
          {/* Header */}
          <ModalHeader borderRadius={8}>
            <Heading size="xl">Import CSV</Heading>
          </ModalHeader>

          {/* Close button */}
          <ModalCloseButton />

          {/* Body */}
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} name="csvFile" />

              {/* Only show details if a file is selected */}
              {selectedFile ? (
                <Text>
                  <strong>File:</strong> {selectedFile.name} (~
                  {Math.floor(selectedFile.size / 1024)}mb)
                </Text>
              ) : null}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="ghost" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              variant="solid"
              rightIcon={<FiUpload />}
              onClick={handleSubmit}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ImportMemberModal
