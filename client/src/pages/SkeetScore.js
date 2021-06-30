import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SkeetScore() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTab = (Tab) => {
    const n = tab.maxPoints;
    return (
      <TabPanel key={tab.id} value={tab.id} index={tab.id}>
        Station {tab.station}:{tab.rules}
        <br></br>
        Hits:{" "}
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
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
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
      {skeetRules.map(renderTab)}
    </div>
  );
}
