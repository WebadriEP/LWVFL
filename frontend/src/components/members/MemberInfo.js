import { useState, useEffect } from "react"
import {
  Flex,
  SimpleGrid,
  GridItem,
  Box,
  Text,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Input,
  Select,
} from "@chakra-ui/react"

const MemberInfo = ({ memberToParent, initialMember }) => {
  const [mode, setMode] = useState("view") // set view or edit mode
  const [data, setData] = useState(initialMember) // set member data state

  useEffect(() => {
    setData(initialMember)
  }, [initialMember])

  // Toggle between view and edit mode
  const toggleMode = () => {
    setMode(mode === "view" ? "edit" : "view")
  }

  // Send member data to parent and toggle back to view mode
  const handleSave = () => {
    // Update the member information in the data state with the new values entered in the input fields
    // Note: Make sure the input fields have onChange handlers that update the corresponding fields in the data state
    memberToParent(data)
    toggleMode()
  }

  const memberSince = new Date(data.createdAt).toLocaleDateString()

  return (
    <Card border="1px solid" borderColor="gray.100" shadow="lg">
      <CardHeader>
        <Flex direction="row" align="space-between">
          <Heading size="lg">Member Info</Heading>
          <Spacer />

          {/* Toggle view/edit mode */}
          {mode === "view" ? (
            <IconButton onClick={toggleMode} colorScheme="gray">
              <i className="fa fa-pencil"></i>
            </IconButton>
          ) : (
            <IconButton onClick={handleSave} colorScheme="blue">
              <i className="fa fa-save"></i>
            </IconButton>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {/* If mode is view, render member data (spinner while data is fetched) */}
        {mode === "view" ? (
          <Box m=".5rem 0">
            {data ? (
              <>
                <SimpleGrid columns={2} spacing={3}>
                  <GridItem>
                    <Text>First Name</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{data.firstName}</Text>
                  </GridItem>

                  <GridItem>
                    <Text>Last Name</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{data.lastName}</Text>
                  </GridItem>

                  <GridItem>
                    <Text>Email</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{data.email}</Text>
                  </GridItem>

                  <GridItem>
                    <Text>Phone Number</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{data.phone}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>Home Address
                  </GridItem>
                  <GridItem>
                    <Text>{data.homeAddress}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>Address Line 2
                  </GridItem>
                  <GridItem>
                    <Text>{data.addressLine2}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>City
                  </GridItem>
                  <GridItem>
                    <Text>{data.city}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>State
                  </GridItem>
                  <GridItem>
                    <Text>{data.state}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>Zip
                  </GridItem>
                  <GridItem>
                    <Text>{data.zip}</Text>
                  </GridItem>

                  <GridItem>
                    <Text></Text>Gender
                  </GridItem>
                  <GridItem>
                    <Text>{data.gender}</Text>
                  </GridItem>

                  <GridItem>
                    <Text>Birth Date</Text>
                  </GridItem>
                  <GridItem>
                    <Text>
                      {data.birthMonth}/{data.birthDay}/{data.birthYear}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <Text>Member Since</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{memberSince}</Text>
                  </GridItem>
                </SimpleGrid>
              </>
            ) : (
              <Spinner />
            )}
          </Box>
        ) : (
          // If mode is edit, render input/select fields with the current member data, but update state on change
          // Saving is handled by using the toggle button to switch back to view mode
          <>
            <SimpleGrid columns={2} spacing={3}>
              <GridItem>
                <Text>First Name</Text>
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control form-control-sm" // Add any additional class names for styling
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
              </GridItem>

              <GridItem>Last Name</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control" // Add any additional class names for styling
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
              </GridItem>

              <GridItem>Email</GridItem>
              <GridItem>
                <Input
                  type="Text" // Use "email" type for email input field
                  className="form-control" // Add any additional class names for styling
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </GridItem>

              <GridItem>Phone Number</GridItem>
              <GridItem>
                <Input
                  type="Text" // Use "tel" type for phone number input field
                  className="form-control" // Add any additional class names for styling
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </GridItem>

              <GridItem>Home Address</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control"
                  value={data.homeAddress}
                  onChange={(e) =>
                    setData({ ...data, homeAddress: e.target.value })
                  }
                />
              </GridItem>

              <GridItem>Address Line 2</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control"
                  value={data.addressLine2}
                  onChange={(e) =>
                    setData({ ...data, addressLine2: e.target.value })
                  }
                />
              </GridItem>

              <GridItem>City</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                />
              </GridItem>

              <GridItem>State</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control"
                  value={data.state}
                  onChange={(e) => setData({ ...data, state: e.target.value })}
                />
              </GridItem>

              <GridItem>Zip</GridItem>
              <GridItem>
                <Input
                  type="text"
                  className="form-control"
                  value={data.zip}
                  onChange={(e) => setData({ ...data, zip: e.target.value })}
                />
              </GridItem>

              <GridItem>Gender</GridItem>
              <GridItem>
                <Select
                  className="form-control"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </GridItem>

              <GridItem>Activity Status</GridItem>
              <GridItem>
                <Select
                  className="form-control"
                  value={data.memberActiveStatus}
                  onChange={(e) =>
                    setData({ ...data, memberActiveStatus: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </GridItem>

              <GridItem>Birth Date</GridItem>
              <GridItem>
                <Input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    const birthdayString = e.target.value
                    const birthMonth = parseInt(birthdayString.slice(5, 7))
                    const birthDay = parseInt(birthdayString.slice(8, 10))
                    const birthYear = parseInt(birthdayString.slice(0, 4))

                    setData({ ...data, birthMonth, birthDay, birthYear })
                  }}
                />
              </GridItem>

              <GridItem>
                <Text>Member Since</Text>
              </GridItem>
              <GridItem>
                <Text>{memberSince}</Text>
              </GridItem>
            </SimpleGrid>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default MemberInfo
