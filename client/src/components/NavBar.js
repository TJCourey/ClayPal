import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "./img/logo.png";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import StarIcon from "@material-ui/icons/Star";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiSilverBullet } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#113b08",
    color: "#ffa500",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    backgroundColor: "#abbf6d",
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    backgroundColor: "#708238",
    color: "white",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#708238",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    backgroundColor: "#abbf6d",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap>
            Claypal
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              //this is the hamberger icon
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              {Auth.loggedIn() ? (
                <>
                  <Link to="/leaderboard">
                    <StarIcon />
                  </Link>

                  <Link to="/skeetscore">
                    <PlayCircleFilledWhiteIcon />
                  </Link>

                  <Link to="/trapscore">
                    <PlayCircleOutlineIcon />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <DashboardRoundedIcon />
                  </Link>

                  <Link to="/login">
                    <PersonSharpIcon />
                  </Link>
                </>
              )}
            </ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
        ;
        <Divider />
        <List>
          {["Gun Safety", "Buy Ammo", "Where to Shoot"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <a
                    rel="NRAsafety"
                    href="https://gunsafetyrules.nra.org/"
                    alt="NRA Safety"
                    target="_blank"
                  >
                    <AiOutlineSafetyCertificate />{" "}
                  </a>
                ) : (
                  <> </>
                )}
                {index === 1 ? (
                  <a
                    rel="Ammo"
                    href="https://www.freedommunitions.com/"
                    alt="Buy Ammo"
                    target="_blank"
                  >
                    {" "}
                    <GiSilverBullet />{" "}
                  </a>
                ) : (
                  <> </>
                )}
                {index === 2 ? (
                  <a
                    rel="Wheretoshoot"
                    href="https://www.wheretoshoot.org/"
                    alt="Where to shoot"
                    target="_blank"
                  >
                    {" "}
                    <GoSearch />{" "}
                  </a>
                ) : (
                  <> </>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
