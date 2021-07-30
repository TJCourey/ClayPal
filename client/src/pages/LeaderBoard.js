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
import { Container } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const skeetColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "score",
    minWidth: 170,
    label: "Skeet Score",
    align: "right",
  },
];
const trapColumns = [
  { id: "name", label: "Name", minWidth: 170 },
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
    id: "percent",
    label: "Hit Percentage",
    minWidth: 170,
    align: "right",
  },
  {
    id: "hits",
    label: "Total Hits",
    minWidth: 170,
    align: "right",
  },
];
function createSkeetData(user) {
  let skeetRows = [];
  user.forEach((user) => {
    const name = user.username;
    for (let i = 0; i < user.skeetScore.length; i++) {
      const score = Number(user.skeetScore[i].overallScore);
      skeetRows.push({ name, score });
    }
    return skeetRows;
  });
  skeetRows.sort((a, b) => (a.score > b.score ? -1 : 1));
  return skeetRows;
}
function createTrapData(user) {
  let trapRows = [];
  user.forEach((user) => {
    const name = user.username;
    for (let i = 0; i < user.trapScore.length; i++) {
      const score = Number(user.trapScore[i].overallScore);
      trapRows.push({ name, score });
    }
    return trapRows;
  });
  trapRows.sort((a, b) => (a.score > b.score ? -1 : 1));
  return trapRows;
}
function createOverallData(user) {
  let shooterRows = [];
  user.forEach((account) => {
    let percent = 0;
    let shots = 0;
    let hits = 0;
    let name = account.username;
    if ((user = account)) {
      for (let i = 0; i < user.skeetScore.length; i++) {
        hits += Number(user.skeetScore[i].overallScore);
        shots++;
      }
      for (let i = 0; i < user.trapScore.length; i++) {
        hits += Number(user.trapScore[i].overallScore);
        shots++;
      }
      percent = hits / (shots * 25);
      percent = percent.toFixed(2);
      shooterRows.push({ name, hits, percent });
    }
  });
  shooterRows.sort((a, b) => (a.percent > b.percent ? -1 : 1));
  return shooterRows;
}

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
  const users = data?.users || [];
  const skeetRows = createSkeetData(users);
  const trapRows = createTrapData(users);
  const overallRows = createOverallData(users);

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
        <Container style={{ marginLeft: "50px" }}>
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
                  <TableContainer
                    className={classes.container}
                    mx="auto"
                    xs={12}
                  >
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
                                      {column.format &&
                                      typeof value === "number"
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
                                      {column.format &&
                                      typeof value === "number"
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
                        {overallRows
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
                                      {column.format &&
                                      typeof value === "number"
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
                    count={overallRows.length}
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
      </Container>
    </>
  );
}
