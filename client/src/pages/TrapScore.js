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

export default function TrapScore() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTab = (tab) => {
    const n = tab.maxPoints;
    return (
      <TabPanel key={tab.id} value={tab.id} index={tab.id}>
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
    <Container>
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
        </Tabs>
        {trapRules.map(renderTab)}
        <Button variant="contained">Default</Button>
      </div>
    </Container>
  );
}
