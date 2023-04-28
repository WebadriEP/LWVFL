
import $ from "jquery";
import React from 'react';
import axios from "axios";
import "datatables.net";
import "datatables.net-dt";
import { useState, useEffect, useMemo } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { getMemberDonations, getSingleMember, deleteDonation } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavLink from "../components/navigation/NavLink";
import { Box, Button } from "@chakra-ui/react";
import DonationTable from "../components/donations/DonationTable"



function Donations() {
  const navigate = useNavigate()
  const { id } = useParams(); // Get the ID from the URL
  const homelink = "/member/" + id + "/"
    const [donations, setDonations] = useState([]); // State for donations
    const [member, setMember] = useState({}); //State for member
    // Fetch all members -- Used for search functionality
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
       getMemberDonations(id)
       
       .then(json => {
        setDonations(json);


        });
    }, [])

    // Acquire member details
  useEffect(() => {
    getSingleMember(id)

    // Set member state
    .then(json => {
      setMember(json) // set member state
 
    })

    // Error handling
    .catch(err => {
      console.log(err)
    })
  }, [])

    //   Determines the columns for the table and what is rendered inside each cell
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        // Renders member's email
        Header: "Amount",
        accessor: "amount",
      },
      {
        // Renders member's phone number
        Header: "Type",
        accessor: "type",
      },
      {
        // Location (City, State)
        Header: "Notes",
        accessor: "notes",
      },

      {
        
        Header: 'Delete Donation Record',
        accessor: (str) => 'delete',
        Cell: props => {
        return <span>
    
            <Button onClick ={() => {

              deleteDonation(props.cell.row.original['_id']).then(() => 
              {props.cell.row = undefined; navigate(homelink + id)});
              
              }}> Delete </Button> </span>
          }
          
      }
      
    ],
    []
  )

      const link = '/donations/add/' + id;

    return(            
           

        <Box
          bg="white"
          borderRadius={8}
          border="1px"
          borderColor="gray.50"
          w="100%"
        >
          <h1>Donations for {member.firstName} {member.lastName}</h1>
          {/* Table generated with React-Table */}
          <DonationTable columns={columns} data={donations} />
          <Button><Link to = {link}>Add New Donation</Link></Button>
        </Box>

        
    );
}

export default Donations;