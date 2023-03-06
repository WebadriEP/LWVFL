import {
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  HStack,
  Button,
  Box,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react"
import { useTable, useSortBy, usePagination,  } from "react-table"
import React from "react"

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

// Table component
function MemberTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    getToggleHideAllColumnsProps,
    allColumns,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    
    usePagination
  )

  return (
    <>
      <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      {/* Pagination controls */}
      <HStack justify="space-between" m={4}>
        {/* Page # of # */}
        <Box>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Box>

        {/* Page nagivation buttons */}
        <ButtonGroup isAttached variant="outline" colorScheme="blue">
          {/* First page */}
          <Tooltip hasArrow label="First page">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
          </Tooltip>

          {/* Previous page */}
          <Tooltip hasArrow label="Previous page">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </Tooltip>

          {/* Next page */}
          <Tooltip hasArrow label="Next page">
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </Button>
          </Tooltip>

          {/* Last page */}
          <Tooltip hasArrow label="Last page">
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </HStack>
    </>
  )
}

export default MemberTable
