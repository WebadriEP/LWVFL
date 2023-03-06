import $ from "jquery";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table, Tr, Th, Td, Thead, Tbody, Link as ReachLink } from '@chakra-ui/react';
import AddMemberPop from "./AddMemberPop";
import { getAllMembers } from "../../api/axios";

import "datatables.net";
import "datatables.net-dt";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

// import datatables styles
import "../ui/datatableStyles.css";

const MemberList = () => {
    const [members, setMembers] = useState([]); // State for members

    // Fetch all members -- Used for search functionality
    const [dataTable, setDataTable] = useState(null);

    /*useEffect(() => {
        getAllMembers().then(json => setMembers(json))
    }, [])*/

    useEffect(() => {
        getAllMembers().then(json => setMembers(json))
        if (!dataTable) {
            setDataTable(
              $("#members-table").DataTable({
                data: members,
                retrieve: true,
                paging: false, // Enable pagination for the table
                searching: true,
                columns: [
                    { 
                        data: "fullName",
                        className: "cellLink", // Assigns className to every cell in this column. Controlled by ./datatableStyles.css
                        fnCreatedCell: (nTd, sData, oData, iRow, iCol) => {
                            // Renders a link to the member's profile. Controlled by ./datatableStyles.css
                            // TODO: Figure out how to make this a Link component from react-router-dom
                            $(nTd).html(`<a href="/member/${oData._id}">${oData.fullName}</a>`);
                        }
                    },
                    { data: "email" },
                    { data: "phone" }
                ],
              })
            );
          } else {
            dataTable.clear();
            dataTable.rows.add(members);
            dataTable.draw();
          }
      }, [members, dataTable]);

    return (
        <div>
        
        <Table id="members-table" className="display">
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
            </Tr>
            </Thead>
            <Tbody>
            {members.map(member => (
                <Tr key={member._id}>
                    <Td>{member.fullName}</Td>
                    <Td>{member.email}</Td>
                    <Td>{member.phone}</Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
        </div>
    )
}

export default MemberList