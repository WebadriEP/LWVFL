import $ from "jquery";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table, Tr, Th, Td, Thead, Tbody, Link as ReachLink } from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';

import "datatables.net";
import "datatables.net-dt";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

// import datatables styles
import "../ui/datatableStyles.css";

function EngagementTable ({ columns, data }) {

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    }, useSortBy)

    return (
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
}

export default EngagementTable