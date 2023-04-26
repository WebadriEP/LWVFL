import React, { useState, useEffect } from "react";
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
  Checkbox,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter, setGlobalFilter, useAsyncDebounce, } from "react-table";


function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Box>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`Search ${count} records...`}
        py={2}
      />
    </Box>
  )
}

function EngagementTable({ columns, data }) {
  const [filter, setFilter] = useState({ active: false, inactive: false });
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = data.filter((member) => {
        if (filter.active && member.memberActiveStatus === "inactive") {
          return false;
        }
        if (filter.inactive && member.memberActiveStatus === "active") {
          return false;
        }
        return true;
      });
      setFilteredData(filteredData);
    }, 500);

    return () => clearTimeout(timer);
  }, [data, filter]);

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
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  return (
    <>
      {/* Filter controls */}
      <Box mb={4}>
        <Checkbox
          isChecked={filter.active}
          name="active"
          onChange={handleFilterChange}
          mr={2}
        >
          Active Members
        </Checkbox>
        <Checkbox
          isChecked={filter.inactive}
          name="inactive"
          onChange={handleFilterChange}
        >
          Inactive Members
        </Checkbox>
      </Box>
      <Box mb={6}>
        <Heading size="sm" mb={2}>
          Search
        </Heading>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Box>

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

export default EngagementTable
