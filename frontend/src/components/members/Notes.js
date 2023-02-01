import { useState, useEffect } from 'react'
import { Flex, Box, Text, Textarea, Card, CardHeader, CardBody, Heading, IconButton, Spacer, Spinner } from '@chakra-ui/react'



const Notes = ({ notesToParent, initialNotes }) => {
  const [mode, setMode] = useState('view') // set view or edit mode
  const [data, setData] = useState(initialNotes) // set notes state

  useEffect(() => {
    setData(initialNotes)
  }, [initialNotes])

  // Toggle between view and edit mode
  const toggleMode = () => {
    mode === 'view' ? setMode('edit') : setMode('view')
  }
  
  // Send notes to parent and toggle back to view mode
  const handleSave = () => {
    notesToParent(data)
    toggleMode()
  }

  return (
    <Card>
      <CardHeader>
        <Flex direction='row' align='space-between'>
          <Heading size='lg'>Notes</Heading>
          <Spacer />
          
          {/* Toggle view/edit mode */}
          {mode === 'view' ? (
            <IconButton onClick={() => toggleMode()} colorScheme='gray'><i className="fa fa-pencil"></i></IconButton>
          ) : (
            <IconButton onClick={() => handleSave()} colorScheme='blue'><i className="fa fa-save"></i></IconButton>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {/* If mode is view, render most recent fetch of member notes (spinner while that is fetched) */}
        {mode === 'view' ? (
          <Box m='.5rem 0'>
            {data === '' ? <Spinner /> : <Text>{data}</Text>}
          </Box>
        ) : (
          // If mode is edit, render a textarea with the current notes, but update state on change
          // Saving is handled by using the toggle button to switch back to view mode
          <Textarea value={data} onChange={(e) => {
            setData(e.target.value)
          }} />
        )}
      </CardBody>
    </Card>
  )
}

export default Notes