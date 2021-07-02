import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useMutation } from "@apollo/client";
import { ADD_TRAP_SCORE } from "../utils/mutations";

const trapRules = [
  {
    id: 0,
    station: 1,
    maxPoints: 5,
  },
  {
    id: 1,
    station: 2,
    maxPoints: 5,
  },
  {
    id: 2,
    station: 3,
    maxPoints: 5,
  },
  {
    id: 3,
    station: 4,
    maxPoints: 5,
  },
  {
    id: 4,
    station: 5,
    maxPoints: 5,
  },
];
const addRules =
  "A round of trap consists of 25 targets, with 5 shots at each station or post, which is 16 yards from the back of the trap house. Trap is shot in squads of up to five shooters. They move from station to station until the shooter has shot from each station.";
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

export default function TrapScore() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [station, setStation] = React.useState("");
  const [weapon, setWeapon] = React.useState("");
  const [shooter, setShooter] = React.useState("");
  const [overallScore, setOverallScore] = React.useState("");

  const [addTrapScore, { error }] = useMutation(ADD_TRAP_SCORE);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTrapScore({
        variables: { station, weapon, shooter, overallScore },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  //Foreach, click, adds 1 to the score
  const handleClick = (event) => {
    setOverallScore(Number(overallScore + 1));
    console.log(overallScore);
  };

  const renderTab = (tab, i) => {
    const n = tab.maxPoints;
    return (
      <TabPanel key={tab.id} value={value} index={i}>
        Station {tab.station}:{tab.rules}
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
  };

  return (
    <>
      <Container className="rulesContainer">
        <h1>Trap Shooting</h1>
        <h3>{addRules}</h3>
      </Container>
      <Container className="trapForm" onSubmit={handleFormSubmit}>
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
              <Tab label="Station One" {...a11yProps(0)} />
              <Tab label="Station Two" {...a11yProps(1)} />
              <Tab label="Station Three" {...a11yProps(2)} />
              <Tab label="Station Four" {...a11yProps(3)} />
              <Tab label="Station Five" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          {trapRules.map(renderTab)}
        </div>
        <Button variant="contained" onSubmit={handleFormSubmit}>
          Submit
        </Button>
      </Container>
    </>
  );
}
