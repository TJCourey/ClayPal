import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import { useMutation } from "@apollo/client";
import { ADD_SKEET_SCORE } from "../utils/mutations";

const skeetRules = [
  {
    id: 0,
    station: 1,
    rules: "High house single, Low house single, High/Low Pair",
    maxPoints: 4,
  },
  {
    id: 1,
    station: 2,
    rules: "High house single, Low house single, High/Low Pair",
    maxPoints: 4,
  },
  {
    id: 2,
    station: 3,
    rules: "High house single, Low house single",
    maxPoints: 2,
  },
  {
    id: 3,
    station: 4,
    rules: "High house single, Low house single",
    maxPoints: 2,
  },
  {
    id: 4,
    station: 5,
    rules: "High house single, Low house single",
    maxPoints: 2,
  },
  {
    id: 5,
    station: 6,
    rules: "High house single, Low house single, High/Low Pair",
    maxPoints: 4,
  },
  {
    id: 6,
    station: 7,
    rules: "High house single, Low house single, High/Low Pair",
    maxPoints: 4,
  },
  {
    id: 7,
    station: 8,
    rules: "High house single, Low house single",
    maxPoints: 2,
  },
  { id: 8, station: "Bonus", rules: "Low House", maxPoints: 1 },
];

const addRules =
  "A round of skeet consists of 25 targets, with 17 shot as singles and 8 as doubles. The first miss is repeated immediately and is called an option. If no targets are missed during the round, the last or 25th target is shot at the last station, low house 8.";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#708238",
  },
}));

export default function SkeetScore() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [station, setStation] = React.useState("");
  const [weapon, setWeapon] = React.useState("");
  const [shooter, setShooter] = React.useState("");
  const [overallScore, setOverallScore] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setOverallScore(Number(overallScore + 1));
    console.log(overallScore);
  };

  const renderTab = (tab, i) => {
    const n = tab.maxPoints;
    return (
      <TabPanel key={tab.id} value={value} index={i}>
        Station {tab.station}:<br></br>
        {tab.rules}
        <br></br>
        Hits:
        {[...Array(n)].map((elementInArray, index) => (
          <Checkbox
            key={index}
            inputProps={{ "aria-label": "uncontrolled-checkbox" }}
            onChange={() => handleClick()}
          />
        ))}
      </TabPanel>
    );
    // console.log(tab.id);
  };

  return (
    <>
      <Container className="rulesContainer">
        <h1 style={{ paddingLeft: "15%" }}>Skeet Shooting</h1>
        <h3 style={{ textAlign: "center", paddingLeft: "15%" }}>{addRules}</h3>
      </Container>
      <Container className="skeetForm">
        <form>
          <div className={classes.root} style={{ marginLeft: "50px" }}>
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
                <Tab label="Station One" {...a11yProps(0)} />
                <Tab label="Station Two" {...a11yProps(1)} />
                <Tab label="Station Three" {...a11yProps(2)} />
                <Tab label="Station Four" {...a11yProps(3)} />
                <Tab label="Station Five" {...a11yProps(4)} />
                <Tab label="Station Six" {...a11yProps(5)} />
                <Tab label="Station Seven" {...a11yProps(6)} />
                <Tab label="Station Eight" {...a11yProps(7)} />
                <Tab label="Bonus" {...a11yProps(8)} />
              </Tabs>
            </AppBar>
            {skeetRules.map(renderTab)}
          </div>
          <Button
            variant="contained"
            style={{
              marginLeft: "50px",
              marginTop: "15px",
              backgroundColor: "#ffa500",
            }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
