import $ from "jquery";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table, Tr, Th, Td, Thead, Tbody, Link as ReachLink } from '@chakra-ui/react';

import "datatables.net";
import "datatables.net-dt";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

// import datatables styles
import "./datatableStyles.css";

const MemberList = () => {
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
                paging: true,
                searching: true,
                columns: [
                    { 
                        data: "fullName",
                        className: "cellLink",
                        fnCreatedCell: (nTd, sData, oData, iRow, iCol) => {
                            /* 
                                Renders a link to the member's profile. Styles controlled by ./datatableStyles.css
                            */
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
        // USES CHAKRA UI COMPONENTS NOW
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
    )
}

export default MemberList