import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { useQuery } from "@apollo/client";
import { QUERY_USERNAME } from "../../utils/queries";

// Generate Order Data
function createData(id, date, overallScore) {
  return { id, date, overallScore };
}

let rows = [];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
//Another comment here
export default function Orders() {
  const classes = useStyles();
  rows = [];

  const { loading, data } = useQuery(QUERY_USERNAME);
  const userData = data?.user || {};
  console.log(data);
  userData.skeetScore.forEach((element) => {
    console.log(element);
    let percent = 0;
    rows.push(createData(element.date, element.overallScore));
    console.log(rows);
  });
  //Holy crap this is actually working
  return (
    <React.Fragment>
      <Title>Recent Shoots</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>----</TableCell>
            <TableCell>----</TableCell>
            <TableCell align="right">Overall Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.skeetScore}</TableCell>
              <TableCell>{row.trapScore}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
