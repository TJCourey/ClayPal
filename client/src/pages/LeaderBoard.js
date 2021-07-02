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
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { CreateRows } from "../components/leaderboardHelpers/skeetscores";

const skeetColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  // {
  //   id: "skeetWeapon",
  //   label: "Weapon",
  //   minWidth: 170,
  //   align: "right",
  // },
  {
    id: "score",
    minWidth: 170,
    label: "Skeet Score",
    align: "right",
  },
];
const trapColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  // {
  //   id: "trapWeapon",
  //   label: "Weapon",
  //   minWidth: 170,
  //   align: "right",
  // },
  {
    id: "score",
    label: "Trap Score",
    minWidth: 170,
    align: "right",
  },
];
const overallColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "weapon",
    label: "Weapon",
    minWidth: 170,
    align: "right",
  },
  {
    id: "overallScore",
    label: "Overall Score",
    minWidth: 170,
    align: "right",
  },
];
function createSkeetData(user) {
  let skeetRows = [];
  user.forEach((user) => {
    const name = user.username;
    for (let i = 0; i < user.skeetScore.length; i++) {
      const score = user.skeetScore[i].overallScore;
      skeetRows.push({ name, score });
    }
    return skeetRows;
  });
  console.log(skeetRows);
  skeetRows.sort((a, b) => (a.score > b.score ? -1 : 1));
  console.log(skeetRows);
  return skeetRows;
}
function createTrapData(user) {
  let trapRows = [];
  user.forEach((user) => {
    const name = user.username;
    for (let i = 0; i < user.trapScore.length; i++) {
      const score = user.trapScore[i].overallScore;
      trapRows.push({ name, score });
    }
    return trapRows;
  });
  console.log(trapRows);
  trapRows.sort((a, b) => (a.score > b.score ? -1 : 1));
  console.log(trapRows);
  return trapRows;
}
// const name = user.username;
// const skeetWeapon = user.skeetScore[i].weapon;
// const skeet = user.skeetScore[i].overallScore;
// const trapWeapon = user.trapScore[i].weapon;
// const trap = user.trapScore[i].overallScore;
// const overallScore = skeet + trap;
// return { name, skeet, trap, overallScore, skeetWeapon, trapWeapon };
//

// function createRows(user) {
//   // create array
//   returnRows = [];
//   // array should contain (username, score, weapon) for each round of trap and skeet
//   user.skeetScore.map(score);
//   // trap and skeet are located at user.skeetscore and user.trapscore
// }

// function createData(score) {
//   const name = score.shooter;
//   const skeetWeapon = score.weapon;
//   const skeet = score.overallScore;
//   return { name, skeetWeapon, skeet };
// }
//Fixed overall score by adding it as an object above
// function createData(name, weapon, skeet, trap) {
//   const overallScore = skeet + trap;
//   return { name, weapon, skeet, trap, overallScore };
// }
// We are going to need data from the database here.
// const rows = [
//   createData("Jack", "Mossberg 500", 15, 18),
//   createData("Josh", "Remington 870", 19, 13),
//   createData("Nick", "Tri-star Setter", 20, 18),
//   createData("TJ", "CZ Drake", 19, 21),
// ];

const useStyles = makeStyles({
  root: {
    backgroundColor: "#708238",
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(0);

  const { loading, data } = useQuery(QUERY_USER);
  if (loading) {
    return null;
  }
  console.log(data);
  const users = data?.users || [];
  console.log(users);
  // const rows = users?.map(createData);
  // users?.map(createData);
  const rows = [];
  const skeetRows = createSkeetData(users);
  const trapRows = createTrapData(users);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container className="leaderTabs">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Skeet Score" {...a11yProps(0)} />
              <Tab label="Trap Score" {...a11yProps(1)} />
              <Tab label="Overall Score" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Container className="scoreTitle">
              <h1>Skeet Scores</h1>
            </Container>
            <Container>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {skeetColumns.map((column) => (
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
                      {/* <CreateRows user={users} /> */}
                      {skeetRows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {skeetColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={skeetRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container className="scoreTitle">
              <h1>Trap Scores</h1>
            </Container>
            <Container>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {trapColumns.map((column) => (
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
                      {trapRows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {trapColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={trapRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Container className="scoreTitle">
              <h1>Overall Score</h1>
            </Container>
            <Container>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {overallColumns.map((column) => (
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
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {overallColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </Container>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
