import { useState, useEffect } from 'react';
import { Flex, SimpleGrid, GridItem, Box, Text, Textarea, Card, CardHeader, CardBody, Heading, IconButton, Spacer, Spinner } from '@chakra-ui/react'

const MemberInfo = ({ memberToParent, initialMember }) => {
  const [mode, setMode] = useState('view'); // set view or edit mode
  const [data, setData] = useState(initialMember); // set member data state

  useEffect(() => {
    setData(initialMember);
  }, [initialMember]);

  // Toggle between view and edit mode
  const toggleMode = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
  };

  // Send member data to parent and toggle back to view mode
  const handleSave = () => {
    // Update the member information in the data state with the new values entered in the input fields
    // Note: Make sure the input fields have onChange handlers that update the corresponding fields in the data state
    memberToParent(data);
    toggleMode();
  };

  return (
    <Card border='1px solid' borderColor='gray.100' shadow='lg'>
      <CardHeader>
        <Flex direction='row' align='space-between'>
          <Heading size='lg'>Member Info</Heading>
          <Spacer />
  
          {/* Toggle view/edit mode */}
          {mode === 'view' ? (
            <IconButton onClick={toggleMode} colorScheme='gray'><i className="fa fa-pencil"></i></IconButton>
          ) : (
            <IconButton onClick={handleSave} colorScheme='blue'><i className="fa fa-save"></i></IconButton>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {/* If mode is view, render member data (spinner while data is fetched) */}
        {mode === 'view' ? (
          <Box m='.5rem 0'>
            {data ? (
              <>
                <SimpleGrid columns={2} spacing={3}>
                  <GridItem><Text>First Name</Text></GridItem>
                  <GridItem><Text>{data.firstName}</Text></GridItem>
  
                  <GridItem><Text>Last Name</Text></GridItem>
                  <GridItem><Text>{data.lastName}</Text></GridItem>
  
                  <GridItem><Text>Email</Text></GridItem>
                  <GridItem><Text>{data.email}</Text></GridItem>
  
                  <GridItem><Text>Phone Number</Text></GridItem>
                  <GridItem><Text>{data.phone}</Text></GridItem>
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
              <GridItem><Text>First Name</Text></GridItem>
              <GridItem>
                <input
                  type="text"
                  className="form-control form-control-sm" // Add any additional class names for styling
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                />
              </GridItem>
  
              <GridItem>Last Name</GridItem>
              <GridItem>
                <input
                  type="text"
                  className="form-control" // Add any additional class names for styling
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                />
              </GridItem>
  
              <GridItem>Email</GridItem>
              <GridItem>
                <input
                  type="Text" // Use "email" type for email input field
                  className="form-control" // Add any additional class names for styling
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </GridItem>
  
              <GridItem>Phone Number</GridItem>
              <GridItem>
                <input
                  type="Text" // Use "tel" type for phone number input field
                  className="form-control" // Add any additional class names for styling
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </GridItem>
            </SimpleGrid>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default MemberInfo;