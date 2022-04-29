import {
  ArrowBackIcon,
  ArrowForwardIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  Column,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { adminColumn } from "../components/admin/adminColumn";
import { adminData } from "../components/admin/adminData";
import { Layout } from "../components/Layout/Layout";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import { ContentWrapper } from "../components/Wrapper/ContentWrapper";
import {
  useAdminCompleteCartItemMutation,
  useAllCartItemsQuery,
} from "../generated/graphql";
import { useIsAdmin } from "../util/useIsAdmin";
import { withApollo } from "../util/withApollo";

interface AdminProps {}

const Admin: React.FC<AdminProps> = ({}) => {
  useIsAdmin();
  const { data: cartItems, loading, error } = useAllCartItemsQuery();
  const [completeCartItem] = useAdminCompleteCartItemMutation();

  const data = useMemo<any>(
    () => adminData(loading, cartItems),
    [loading, cartItems]
  );

  const columns = useMemo<Column[]>(
    () => adminColumn(completeCartItem),
    [completeCartItem]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
      // initialState: {
      //   filters: [
      //     {
      //       id: "status",
      //       value: CartItemStatus.Received,
      //     },
      //   ],
      // },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Error text={error.message} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentWrapper m={20}>
        <Heading fontSize="2xl">Admin Dashboard</Heading>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column: any, index) => (
                  <Th key={index}>
                    <Box
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      {column.render("Header")}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Box>

                    <Box>
                      {column.canFilter ? column.render("Filter") : null}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell: any, index) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      key={index}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        <Center mt={4}>
          <Box>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Box>
        </Center>
        <Center gap={5} mt={4}>
          <Button
            rightIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Prev
          </Button>

          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </Center>
      </ContentWrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Admin);
