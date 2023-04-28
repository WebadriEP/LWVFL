import {
  Heading,
  Link as ReachLink,
  HStack,
  Button,
  IconButton,
  Tooltip,
  Flex,
  Skeleton,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  ButtonGroup,
} from "@chakra-ui/react"
import AddMemberPop from "../components/members/AddMemberPop"
import { useState, useEffect, useMemo } from "react"
import { getAllMembers, updateMember } from "../api/axios"
import { Link } from "react-router-dom"
import { FiArchive, FiEdit, FiShare } from "react-icons/fi"
import { TbFileImport } from "react-icons/tb"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CsvDownloadButton from "react-json-to-csv"

import MemberTable from "../components/members/memberTable"

const Members = () => {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showColumns, setShowColumns] = useState([])
  const toast = useToast()
  const navigate = useNavigate()

  //const navigate = useNavigate()

  const routeChange = () => {
    let path = `/members/import`
    navigate(path)
  }

  // Fetch all members -- Used for search functionality
  const fetchMembers = () => {
    getAllMembers().then((json) => {
      setMembers(json)
      setShowColumns(
        json.length > 0 ? Object.keys(json[0]).map((key) => key) : []
      )
    })
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleAddMember = (newMember) => {
    // Update the state with the new member data
    try {
      setMembers([...members, newMember])
      handleMemberAdded()
    } catch (error) {
      console.log("Error adding member:", error)
    }
  }

  const handleMemberAdded = () => {
    toast({
      title: "Member added.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + "/api/members/" + id
      )
      console.log(response.data)
      // Remove the deleted member from the local state
      setMembers((members) => members.filter((member) => member._id !== id))
      displayToast("Member deleted!", "error")
    } catch (error) {
      console.log(error)
    }
  }

  const displayToast = (title, status) => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    })
  }

  //   Determines the columns for the table and what is rendered inside each cell
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        Cell: (props) => (
          // Takes name as prop and renders it as a styled link to the member's profile
          <ReachLink
            as={Link}
            to={`/member/${props.row.original._id}`}
            color="blue.500"
          >
            {props.value}
          </ReachLink>
          //   TODO: Render badges depicting status, isStudent, etc. (use shorthand like a single letter or an icon)
        ),
        className: "nameCell",
      },
      {
        // Renders member's email
        Header: "Email",
        accessor: "email",
      },
      {
        // Renders member's phone number
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        // Location (City, State)
        Header: "Location",
        accessor: "location",
      },
      {
        // Renders actions that user can perform, such as deleting or updating
        Header: " ",
        Cell: ({ row }) => (
          <HStack spacing={4} justify="end">
            <Popover placement="bottom-end">
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <IconButton
                      icon={<FiArchive />}
                      colorScheme="red"
                      size="sm"
                    />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>
                        <b>Confirmation</b>
                      </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        Are you sure you would like to delete this member?
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            handleDelete(row.original._id)
                            onClose()
                          }}
                        >
                          Yes
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </HStack>
        ),
      },
    ],
    []
  )

  return (
    <>
      <Flex direction="row" justify="space-between" align="center">
        <Heading as="h1" size="xl" mb={4}>
          Members
        </Heading>
        <Flex maxW="30%" align="space-between" gap={4}>
          <ButtonGroup isAttached>
            {/* EXPORT */}
            <Button
              as={CsvDownloadButton}
              data={members}
              delimiter=","
              filename={"members-export-" + Date.now() + ".csv"}
              colorScheme="blue"
              variant="outline"
              rightIcon={<FiShare />}
            >
              Export
            </Button>

            {/* IMPORT */}
            <Button
              as={Link}
              to="/members/import"
              colorScheme="blue"
              variant="outline"
              borderRadius={0}
              rightIcon={<TbFileImport />}
              _hover={{
                textDecoration: "none",
              }}
            >
              Import
            </Button>

            {/* ADD MEMBER */}
            <AddMemberPop onAddMember={handleAddMember} />
          </ButtonGroup>
        </Flex>
      </Flex>

      <MemberTable columns={columns} data={members} />
    </>
  )
}

export default Members
