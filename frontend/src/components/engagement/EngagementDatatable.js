import $ from "jquery";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Tr, Th, Td, Thead, Tbody, Link as ReachLink } from '@chakra-ui/react';

import "datatables.net";
import "datatables.net-dt";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

// import datatables styles
import "../ui/datatableStyles.css";
import { getAllMembers } from "../../api/axios";

const EngagementDatatable = () => {
    const [members, setMembers] = useState([]);
    const [dataTable, setDataTable] = useState(null);

    useEffect(() => {
      // Fetch all members & filter by engagement status; update state
      getAllMembers().then(res => setMembers(res.filter(member => member.memberStatus === 'engage')));
    }, [])

    useEffect(() => {
      // Datatable Rendering
      if (!dataTable) {
          setDataTable(
            $("#members-table").DataTable({
              data: members,
              retrieve: true,
              paging: true, // Enable pagination for the table
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
                // TODO: Quick copy email
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

export default EngagementDatatable