import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { styled } from "@mui/material/styles";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";
import TablePaginationActions from "./TablePaginationActions";
import { Transaction } from "../../services/transaction-service";
import { Merchant } from "../../pages/TransactionPage";

interface Props {
  transactions: Transaction[];
  bezos: Merchant;
  onMark: (merchantName: string) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TransactionTable = ({ transactions, bezos, onMark }: Props) => {

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        header: "Merchant Name",
        accessorKey: "merchant_name",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Bezos",
      },
    ],
    []
  );
  const { getHeaderGroups, getRowModel, getState, setPageIndex, setPageSize } =
    useReactTable({
      data: transactions,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
    });
  const { pageSize, pageIndex } = getState().pagination;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  const merchantName = row.original.merchant_name;
                  if (row.getVisibleCells().length - 1 == index) {
                    if (bezos[merchantName]) {
                      return (
                        <TableCell
                          onClick={() => onMark(merchantName)}
                          sx={{ cursor: "pointer" }}
                          key={cell.id}
                        >
                          <DoneOutlineIcon />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        onClick={() => onMark(merchantName)}
                        sx={{ cursor: "pointer" }}
                        key={cell.id}
                      >
                        X
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={(_, page) => {
          setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};

export default TransactionTable;
