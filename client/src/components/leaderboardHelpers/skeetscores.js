import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Container } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function CreateRows(props) {
  //     // create array
  //     returnRows = []
  //     // array should contain (username, score, weapon) for each round of trap and skeet
  //     user.skeetScore.map(score )
  //     // trap and skeet are located at user.skeetscore and user.trapscore
  return (
    <>
      <Table>
        <TableBody>
          {props.users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell id="name" label="name">
                {user.username}
              </TableCell>
              <TableCell id="skeetWeapon" label="skeetWeapon">
                {user.skeetScore[0].weapon}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
