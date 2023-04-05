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
  Flex,
} from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { useState } from "react"
import { useEffect } from "react"
import { useMembersContext } from "../../hooks/useMembersContext"
import { addMemberFuntion } from "../../api/MemberCRUD"

function AddMemberPop() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [homeAddress, setHomeAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setUsersState] = useState("")
  const [zip, setZip] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [gender, setGender] = useState("")
  const [memberType, setMemberType] = useState("")
  const [isStudent, setIsStudent] = useState(false)

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await addMemberFuntion(
        firstName,
        lastName,
        email,
        phone,
        homeAddress,
        city,
        state,
        zip
      )
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {/* New Member button */}
      <Button onClick={onOpen} rightIcon={<FiPlus />} colorScheme="blue">
        New Member
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} borderRadius={8} size="full">
        {/* Background overlay */}
        <ModalOverlay />

        {/* Modal content */}
        <ModalContent>
          {/* Header */}
          <ModalHeader borderRadius={8}>
            <Heading size="xl">New Member Form</Heading>
          </ModalHeader>

          {/* Close button */}
          <ModalCloseButton />

          {/* Body */}
          <ModalBody>
            <form className="create" onSubmit={handleSubmit}>
              <SimpleGrid columns={2} spacing={4}>
                {/* First column */}
                <Flex direction="column" align="space-between" px={4}>
                  <Heading size="lg" my={4}>
                    Contact Information
                  </Heading>

                  {/* Name */}
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <Box>
                      <FormLabel>First Name*</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="John"
                      />
                    </Box>
                    <Box>
                      <FormLabel>Last Name*</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Doe"
                      />
                    </Box>
                  </SimpleGrid>
                  <Box mb={4}>
                    <FormLabel>Email Address*</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="john@example.com"
                    />
                  </Box>
                  <Box mb={4}>
                    <FormLabel>Phone Number*</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="1234567890"
                      required
                    />
                  </Box>
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      {/* Birthday */}
                      <FormLabel>Birth Date*</FormLabel>
                      <Input
                        type="date"
                        onChange={(e) => {
                          let birthdayString = e.target.value
                          let birthMonth = birthdayString.slice(5, 7)
                          let birthDay = birthdayString.slice(8, 10)
                          let birthYear = birthdayString.slice(0, 4)

                          setBirthMonth(birthMonth)
                          setBirthDay(birthDay)
                          setBirthYear(birthYear)
                        }}
                        required
                      />
                    </Box>
                    {/* Gender */}
                  </SimpleGrid>
                  <Box>
                    <Heading size="lg" my={4}>
                      Location Information
                    </Heading>
                    <Box mb={4}>
                      <FormLabel>Home Address*</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setHomeAddress(e.target.value)}
                        value={homeAddress}
                        placeholder="123 Main St"
                      />
                    </Box>
                    <Box mb={4}>
                      <FormLabel>Address Line 2</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setHomeAddress(e.target.value)}
                        value={homeAddress}
                        placeholder="Apartment, suite, etc."
                      />
                    </Box>
                    <SimpleGrid columns={3} spacing={4}>
                      <Box>
                        <FormLabel>City*</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                          placeholder="New York City"
                        />
                      </Box>
                      <Box>
                        <FormLabel>State*</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setUsersState(e.target.value)}
                          value={state}
                          placeholder="NY"
                        />
                      </Box>
                      <Box>
                        <FormLabel>Zip Code*</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setZip(e.target.value)}
                          value={zip}
                          placeholder="10001"
                        />
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Flex>

                {/* Right column */}
                <Flex direction="column" align="space-between" px={4}>
                  <Box>
                    <Heading size="lg" my={4}>
                      Membership Information
                    </Heading>
                    <Box mb={4}>
                      <FormLabel>Membership Type*</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                        placeholder="10001"
                      />
                    </Box>
                  </Box>
                </Flex>
              </SimpleGrid>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="ghost" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" variant="solid" onClick={handleSubmit}>
              Add Member
            </Button>

            {error && <div className="error">{error}</div>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddMemberPop
