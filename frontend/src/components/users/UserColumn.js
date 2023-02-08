import {
    Card,
    Stack,
    Heading,
    Button,
    CardHeader,
    CardBody,
    CardFooter,
    Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function UserColumn({user, updateUsers}) {
    
    const  userContext  = JSON.parse(localStorage.getItem('user'))

    const handleDelete = async (id) => {
        await axios.delete('/api/users/delete/' + id)
          .then((response) => {
            console.log(response.data)
            updateUsers();
          })
      }
      console.log(userContext.email)
      console.log(user.email)
      if(userContext.email != user.email){
        return (
        <div>
            {
            <Card style={{ marginBottom: "20px" }} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' >
                <Stack style = {{width: "100%", height: "100%"}}>
                    <CardBody style = {{width: "100%", height: "100%"}}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Heading size="md">{user.firstName}</Heading>
                        <div>
                        <Link to={{pathname: `/update-user/${user._id}`}}>
                            <Button className='buttons' variant='solid' colorScheme='blue' >Update Information</Button>
                            </Link>                               
                            <Button className='buttons' variant='solid' colorScheme='red' style={{marginLeft:"10px"}} onClick={() => handleDelete(user._id)}>Delete User</Button>
                           { /*<Link to={{pathname: `/update-password/${user._id}`}}>
                            <Button className='buttons' variant='solid' colorScheme='green' style={{marginLeft:"10px", marginRight:"10px"}}>Update Password</Button>
            </Link>  */}                             

                        </div>
                    </div>
                    </CardBody>
    
                    <CardFooter>
                        <div display={{display:"flex", alignItems:"Center"}}>
                            <p>Location: {user.city}</p>
                            <p>Phone Number: {user.phone}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </CardFooter>
                </Stack>
            </Card>
            }
        </div>
        
        
    )
}
else{
    return (
        <div>
            {
            <Card style={{ marginBottom: "20px" }} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' >
                <Stack style = {{width: "100%", height: "100%"}}>
                    <CardBody style = {{width: "100%", height: "100%"}}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Heading size="md">{user.firstName}</Heading>
                        <div>
                        <Link to={{pathname: `/update-user/${user._id}`}}>
                            <Button className='buttons' variant='solid' colorScheme='blue' >Update Information</Button>
                            </Link>                               
                           { /*<Link to={{pathname: `/update-password/${user._id}`}}>
                            <Button className='buttons' variant='solid' colorScheme='green' style={{marginLeft:"10px", marginRight:"10px"}}>Update Password</Button>
            </Link>  */}                             

                        </div>
                    </div>
                    </CardBody>
    
                    <CardFooter>
                        <div display={{display:"flex", alignItems:"Center"}}>
                            <p>Location: {user.city}</p>
                            <p>Phone Number: {user.phone}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </CardFooter>
                </Stack>
            </Card>
            }
        </div>
        
        
    )

}
        
    
    
}
