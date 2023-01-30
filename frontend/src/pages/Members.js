import $ from "jquery";
import React from 'react';
import axios from "axios";
import "datatables.net";
import "datatables.net-dt";

import { useState, useEffect } from 'react';
import { getAllMembers } from '../api/axios';
import { Link } from "react-router-dom";

import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';


// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberList from "../components/members/MemberList";
import AddMember from "./AddMember"
// css
import '../components/members/memberStyles.css'

function Members() {
    const [members, setMembers] = useState([]); // State for members
    // Fetch all members -- Used for search functionality
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:3001/api/members").then((res) => {
            setMembers(res.data);
        });
    }, [])

    useEffect(() => {
        if (!dataTable) {
            setDataTable(
              $("#members-table").DataTable({
                data: members,
                retrieve: true,
                paging: false,
                columns: [
                    
                    { data: "firstName",
                    "defaultContent": "" },
                    { data: "lastName",
                    "defaultContent": ""},
                    { data: "email",
                    "defaultContent": "" },
                    { data: "phone",
                    "defaultContent": "" }
                ],
              })
            );
          } else {
            dataTable.clear();
            dataTable.rows.add(members);
            dataTable.draw();
          }
      }, [members, dataTable]);

    return(
        <>            
            <div>
                <table id="members-table" className="display">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member._id}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Members;