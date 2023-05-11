import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: "name" | "number" | "description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "number", label: "Number", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
];

interface Data {
  id: number;
  name: string;
  number: number;
  description: string;
}

function createData(
  id: number,
  name: string,
  number: number,
  description: string
): Data {
  return { id, name, number, description };
}

const rows = [
  createData(1, "India", 1324171354, "IN"),
  createData(2, "China", 1403500365, "IN"),
  createData(3, "Italy", 60483973, "IN"),
];

const theTeamRows = [
  { id: 1, name: "India", number: 1235, description: "IN" },
  { id: 1, name: "asdf", number: 1324171354, description: "IN" },
  { id: 2, name: "zxcv", number: 77788, description: "IN" },
  { id: 2, name: "bbb", number: 1324171354, description: "IN" },
  { id: 2, name: "asdfqwe", number: 1324171354, description: "IN" },
  { id: 3, name: "China", number: 1324171354, description: "IN" },
  { id: 1, name: "China", number: 1324171354, description: "IN" },
];

const Member = () => {
  const [teamRows, setTeamRows] = useState<
    { id: number; name: string; number: number; description: string }[]
  >([]);

  const handleTeamMember = (id: number) => {
    setTeamRows(theTeamRows.filter((member) => member.id === id));
  };
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Paper sx={{ width: "50%", margin: 2, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={2}>
                  Team
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTeamMember(row.id)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {teamRows.length > 0 && (
        <Paper sx={{ width: "50%", margin: 2, overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={2}>
                    Team member
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teamRows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      style={{ cursor: "pointer" }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Member;
