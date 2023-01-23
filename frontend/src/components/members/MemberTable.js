import React from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import { Skeleton } from '@chakra-ui/react'
import axios from 'axios'

const MemberTable = () => {

  // TABLE COLUMN HEADERS
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          }
        ]
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Notes',
        accessor: 'notes',
      }
    ], []
  )

  const axiosCall = axios.get('/api/members').then(res => {
    console.log(res.data)
  })

  const data = axiosCall

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <>
      <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default MemberTable