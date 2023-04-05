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
  Input,
  ButtonGroup,
  Tooltip,
  SimpleGrid,
  GridItem,
  Flex,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Heading,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react"
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  setGlobalFilter,
  useAsyncDebounce,
} from "react-table"
import React from "react"

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <Checkbox ref={resolvedRef} {...rest}>
        Toggle All
      </Checkbox>
    )
  }
)
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
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  )

  return (
    <>
      {/* Page layout */}
      <SimpleGrid templateColumns="2.5fr 10fr" spacing={6}>
        {/* Filters side */}
        <Flex align="start">
          <Flex
            direction="column"
            p={5}
            borderRadius={8}
            border="1px"
            borderColor="gray.100"
          >
            {/* Searchbar */}
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

            {/* COLUMN TOGGLES */}
            <Box mb={6}>
              <Heading size="sm" mb={2}>
                Toggle Columns
              </Heading>
              <CheckboxGroup>
                {/* "Toggle All" Checkbox */}
                <Stack direction="column">
                  <Box>
                    <IndeterminateCheckbox
                      {...getToggleHideAllColumnsProps()}
                    />
                  </Box>

                  {/* Map of Remaining Column Checkboxes */}
                  {allColumns.slice(0, -1).map((column) => (
                    <Box key={column.id}>
                      <Checkbox
                        {...column.getToggleHiddenProps()}
                        defaultChecked
                      >
                        {column.Header}
                      </Checkbox>
                    </Box>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>

            {/* Type Filters */}
            <Box mb={6}>
              <Heading size="sm" mb={2}>
                Filter by Type
              </Heading>
              <CheckboxGroup>
                <Stack direction="column">
                  <Checkbox value="member">Member</Checkbox>
                  <Checkbox value="donor">Donor</Checkbox>
                  <Checkbox value="memberdonor">Member & Donor</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>

            {/* Show students? */}
            <Box>
              <Heading size="sm" mb={2}>
                Show Students?
              </Heading>
              {/* RadioGroup */}
              <RadioGroup>
                <Stack direction="row">
                  <Radio value={true} mr={4}>
                    Yes
                  </Radio>
                  <Radio value={false}>No</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
        </Flex>

        {/* Table side */}
        <Flex
          direction="column"
          borderRadius={8}
          border="1px"
          borderColor="gray.100"
        >
          {/* Table */}
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      )
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
                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
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
        </Flex>
      </SimpleGrid>
    </>
  )
}

export default MemberTable
