import { useState } from "react"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createDonation } from "../../api/axios"
import { getSingleMember } from "../../api/axios"
import { useEffect } from "react"
import {
  Box,
  Heading,
  Center,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Flex,
  Tag,
  Input,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Divider,
  GridItem,
  Tabs,
  TabList,
  Tab,
  SimpleGrid,
  Button,
  HStack,
  Select,
  Spinner,
  ButtonGroup,
  Form,
  FormLabel
} from "@chakra-ui/react"

const AddDonationForm = () => {
  const donorID = useParams()
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [notes, setNotes] = useState("")
  const [emptyFields, setEmptyFields] = useState([])
  const [member, setMember] = useState({})

  const [error, setError] = useState(null)
  //console.log(donorID);

  const navigate = useNavigate()
  const homelink = "/member/" + donorID.id

  useEffect(() => {
    getSingleMember(donorID.id)
      // Set member state
      .then((json) => {
        setMember(json) // set member state
      })

      // Error handling
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const name = member.firstName + " " + member.lastName

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      console.log(donorID)
      await createDonation(donorID.id, {
        donorID: donorID.id,
        memberName: name,
        amount: amount,
        date: date,
        type: type,
        notes: notes,
      }) 
      navigate(homelink)
    } catch (err) {
      setError(err.message)
    }
    
  }

  return(

    <><VStack as="header" spacing="6" mt="8"><Heading>Specify Donation Information</Heading></VStack>
    
    <Center><Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='400px' spacing="4">
      
      <CardBody>
      <form>
      <FormLabel>Date</FormLabel>
      <Input type="date" onChange={(e) => setDate(e.target.value)}/>

      <FormLabel>Donation Amount</FormLabel>
      <HStack><Input type="text" onChange={(e) => setAmount(e.target.value)} /><Tag size="lg">$</Tag></HStack>

      <FormLabel>Donation Type</FormLabel>

      <RadioGroup defaultValue='Other'>
  <     Stack spacing={5} direction='row'>
          <Radio value='Literacy Fund' onChange={(e) => setType(e.target.value)}>
            Literacy Fund
          </Radio>
          <Radio value='Advocacy Fund' onChange={(e) => setType(e.target.value)}>
          Advocacy Fund
          </Radio>
          <Radio value='Other' onChange={(e) => setType(e.target.value)}>
          Other
          </Radio>
        </Stack>
      </RadioGroup>

      <FormLabel>Notes</FormLabel>
      <Input type="text" onChange={(e) => setNotes(e.target.value)}/>

      <Button onClick={handleSubmit} colorScheme="green ">
          Add Donation
        </Button>

      </form>
      </CardBody>


    </Card></Center></>
  )
}

export default AddDonationForm
