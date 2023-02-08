
import $ from "jquery";
import React from 'react';
import axios from "axios";
import "datatables.net";
import "datatables.net-dt";
import { useState, useEffect } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { getMemberDonations, getSingleMember } from "../api/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavLink from "../components/navigation/NavLink";

function Donations() {
    const { id } = useParams(); // Get the ID from the URL
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

    useEffect(() => {
        if (!dataTable) {
            setDataTable(
              $("#donations-table").DataTable({
                data: donations,
                retrieve: true,
                paging: false,
                columns: [
                    
                    { data: "date",
                    "defaultContent": "" },
                    { data: "amount",
                    "defaultContent": ""},
                    { data: "type",
                    "defaultContent": "" },
                    { data: "notes",
                    "defaultContent": "" }
                ],
              })
            );
          } else {
            dataTable.clear();
            dataTable.rows.add(donations);
            dataTable.draw();
          }
      }, [donations, dataTable]);

      const link = '/donations/add/' + id;

    return(
        <>            
            <div>

                <h1>Donations for {member.firstName} {member.lastName}</h1>
                <table id="donations-table" className="display">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {donations.map((donation) => (
                        <tr key={donation._id}>
                        <td>{donation.date}</td>
                        <td>{donation.amount}</td>
                        <td>{donation.type}</td>
                        <td>{donation.notes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <NavLink page={link} text='Add Donation' />
            </div>
        </>
    );
}

export default Donations;