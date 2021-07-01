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
const addRules = [
  "A round of trap consists of 25 targets, with 5 shots at each station or post, which is 16 yards from the back of the trap house. Trap is shot in squads of up to five shooters. They move from station to station until the shooter has shot from each station.",
  "Any type of shotgun may be used – single barrel, double barrel, pump or semi-automatic; and any gauge not larger than 12 gauge. A 12 gauge is the most popular. Any brand of shells is permissible, but nothing larger than size #7-½ (no number lower than #7-½) shot should ever be used.",
];

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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TrapScore() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          />
        ))}
      </TabPanel>
    );
  };

  return (
    <>
      <Container className="rulesContainer">
        <h1>Trap Shooting</h1>
        <h3>
          {addRules[0]}
          <br></br>
          {addRules[1]}
        </h3>
      </Container>
      <Container className="trapForm">
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
        <Button variant="contained">Default</Button>
      </Container>
    </>
  );
}
