import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'

import { useState } from 'react'
import { useEffect } from "react"
import { useMembersContext } from "../../hooks/useMembersContext"
import { addMemberFuntion } from '../../api/MemberCRUD'


function AddMemberPop() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setUsersState] = useState('')
    const [zip, setZip] = useState('')
  
    const [error, setError] = useState(null);   

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        try {
            await addMemberFuntion(firstName, lastName, email, phone, homeAddress, city, state, zip);
            onClose()
        } catch (err) {
            setError(err.message);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Add New Member</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Member's Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Member</h3>

                    <label>First Name*</label>
                    <input 
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)} 
                        value={firstName} 
                    />

                    <label>Last Name*</label>
                    <input 
                        type="text"
                        onChange={(e) => setLastName(e.target.value)} 
                        value={lastName} 
                    />
                    <label>Email Address*</label>
                        <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                    <label>Phone Number*</label>
                    <input 
                        type="text"
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone} 
                    />
                    <label>Home Address*</label>
                    <input 
                        type="text"
                        onChange={(e) => setHomeAddress(e.target.value)} 
                        value={homeAddress} 
                    />
                    <label>Address Line 2</label>
                    <input 
                        type="text"
                        onChange={(e) => setHomeAddress(e.target.value)} 
                        value={homeAddress} 
                    />
                    <label>City*</label>
                    <input 
                        type="text"
                        onChange={(e) => setCity(e.target.value)} 
                        value={city} 
                    />
                    <label>State*</label>
                    <input 
                        type="text"
                        onChange={(e) => setUsersState(e.target.value)} 
                        value={state} 
                    />
                    <label>Zip Code*</label>
                    <input 
                        type="text"
                        onChange={(e) => setZip(e.target.value)} 
                        value={zip} 
                    />
                <Button variant='ghost' onClick={handleSubmit}>Submit</Button> <Button colorScheme='blue' mr={3} onClick={onClose}> Close</Button>
                {error && <div className ="error">{error}</div>}
                </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
export default AddMemberPop