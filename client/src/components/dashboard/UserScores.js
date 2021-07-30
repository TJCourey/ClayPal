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

function createData(date, overallScore) {
  return { date, overallScore };
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
export default function Orders() {
  const classes = useStyles();
  rows = [];
  const { loading, data } = useQuery(QUERY_USERNAME);
  const userData = data?.user || {};
  if (loading) {
    return <> Loading...</>;
  }
  if (userData && userData.skeetScore) {
    userData.skeetScore.forEach((element) => {
      rows.push(createData(element.date, element.overallScore));
    });
  }
  if (userData && userData.trapScore) {
    userData.trapScore.forEach((element) => {
      rows.push(createData(element.date, element.overallScore));
    });
  }
  if (userData && (userData.skeetScore || userData.trapScore)) {
    rows.sort(function (a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

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
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.skeetScore}</TableCell>
              <TableCell>{row.trapScore}</TableCell>
              <TableCell align="right">{row.overallScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See More Scores
        </Link>
      </div>
    </React.Fragment>
  );
}
