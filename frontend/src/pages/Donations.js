
import $ from "jquery";
import React from 'react';
import axios from "axios";
import "datatables.net";
import "datatables.net-dt";
import { useState, useEffect } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';

// css
import '../components/members/memberStyles.css'

function Donations() {
    const [donations, setDonations] = useState([]); // State for members
    // Fetch all members -- Used for search functionality
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:3001/api/donations").then((res) => {
            setDonations(res.data);
        });
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

    return(
        <>            
            <div>

                <h1>Donations for ~name of member~</h1>
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
            </div>
        </>
    );
}

export default Donations;