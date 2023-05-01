import $ from "jquery"
import React from "react"
import axios from "axios"
import "datatables.net"
import "datatables.net-dt"
import { useState, useEffect, useMemo } from "react"
import "datatables.net-dt/css/jquery.dataTables.css"
import {
  getDonations,
  deleteDonation,
} from "../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import NavLink from "../components/navigation/NavLink"
import { Box, Button, Heading } from "@chakra-ui/react"
import DonationTable from "../components/donations/DonationTable"

function Donations() {
  const navigate = useNavigate()
  const { id } = useParams() // Get the ID from the URL
  const homelink = "/member/" + id + "/"
  const [donations, setDonations] = useState([]) // State for donations
  const [members, setMembers] = useState([]) //State for members
  
  const [dataTable, setDataTable] = useState(null)
  useEffect(() => {
    getDonations().then((json) => {
      setDonations(json)
    })
  }, [])

  //   Determines the columns for the table and what is rendered inside each cell
  const columns = useMemo(
    () => [
  
      {
        Header: "Member",
        accessor: "memberName",
      },
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
    ],
    []
  )
  return <><Heading>All Donations</Heading><DonationTable columns={columns} data={donations} /></>
}

export default Donations
