import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import NoteIcon from "@mui/icons-material/Note";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MuseumIcon from "@mui/icons-material/Museum";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import useMediaQuery from "@mui/material/useMediaQuery";
// const LeftSideBar = () => {
//   const navigate = useNavigate();
//   return (
//     <ul className={styles.leftSideUl}>

//       <li onClick={(e) => navigate("/")}>
//         <DashboardIcon />
//         <small className="d-none d-lg-flex ms-2"> Dashboard</small>
//       </li>
//       <li onClick={(e) => navigate("/user")}>
//         <GroupIcon />
//         <small className="d-none d-lg-flex ms-2"> User</small>
//       </li>
//       <li onClick={(e) => navigate("/notebook")}>
//         <NoteIcon />
//         <small className="d-none d-lg-flex ms-2"> Notebook </small>
//         <div>
//           <ul>
//             <li>hi</li>
//           </ul>
//         </div>
//       </li>
//       <li onClick={(e) => navigate("/tool_noteBook")}>
//         <StickyNote2Icon />
//         <small className="d-none d-lg-flex ms-2"> Tool Notebook</small>
//       </li>
//       <li onClick={(e) => navigate("/use_case")}>
//         <WorkIcon />
//         <small className="d-none d-lg-flex ms-2"> Use Case</small>
//       </li>
//       <li onClick={(e) => navigate("/line_chart")}>
//         <ShowChartIcon />
//         <small className="d-none d-lg-flex ms-2"> Line Chart</small>
//       </li>
//       <li onClick={(e) => navigate("/bar_chart")}>
//         <BarChartIcon />
//         <small className="d-none d-lg-flex ms-2"> Bar Chart</small>
//       </li>
//       <li onClick={(e) => navigate("/map")}>
//         <MapIcon />
//         <small className="d-none d-lg-flex ms-2"> Map</small>
//       </li>
//       <li onClick={(e) => navigate("/logout")}>
//         <LogoutIcon />
//         <small className="d-none d-lg-flex ms-2"> LogOut</small>
//       </li>
//     </ul>
//   );
// };

// export default LeftSideBar;

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
// import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link, NavLink } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LeftSideBar({ children }) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(largeScreen);
  const [openSubNoteBook, setOpenSubNoteBook] = React.useState(false);
  const [openSubToolNotebook, setOpenSubToolNotebook] = React.useState(false);
  const [openSubUseCase, setOpenSubUseCase] = React.useState(false);
  const [openSubWorkFlow, setOpenSubWorkFlow] = React.useState(false);
  const [openSubOutreachy, setOpenSubOutreachy] = React.useState(false);
  const handleClickNoteBook = () => {
    setOpenSubNoteBook(!openSubNoteBook);
  };
  const handleClickToolNoteBook = () => {
    setOpenSubToolNotebook(!openSubToolNotebook);
  };
  const handleClickUseCase = () => {
    setOpenSubUseCase(!openSubUseCase);
  };
  const handleClickWorkFlow = () => {
    setOpenSubWorkFlow(!openSubWorkFlow);
  };
  const handleClickOutreachy = () => {
    setOpenSubOutreachy(!openSubOutreachy);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const classes = {
    activeLink: "activeLink",
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // React.useLayoutEffect(() => {
  //   function updateSize() {
  //     setOpen(largeScreen);
  //   }
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);
  return (
    <Box sx={{ display: "flex" }}>
      {/* {largeScreen ? setOpen(true) : setOpen(false)} */}
      <CssBaseline />
      <AppBar position="fixed" open={open && largeScreen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && largeScreen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Galwiz Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open && largeScreen}>
        <DrawerHeader>
          <img
            className="d-none d-lg-flex"
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10%",
              width: "80%",
            }}
            src="/images/logo.png"
            alt="not found"
          />
          <img
            className="d-lg-none"
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10%",
              width: "80%",
            }}
            src="/images/logo.png"
            alt="not found"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/user"
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/notebook"
            onClick={handleClickNoteBook}
          >
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary="Notebook" />
            {openSubNoteBook ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubNoteBook} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/notebook"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="all Notebooks " />
              </ListItem>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/unapproved_notebook"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Unapproved" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/tool_noteBook"
            onClick={handleClickToolNoteBook}
          >
            <ListItemIcon>
              <StickyNote2Icon />
            </ListItemIcon>
            <ListItemText primary="Tool Notebook" />
            {openSubToolNotebook ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubToolNotebook} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/tool_noteBook"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="all Tool Notebook " />
              </ListItem>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/unapproved_tool_noteBook"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Unapproved" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/use_case"
            onClick={handleClickUseCase}
          >
            <ListItemIcon>
              <MuseumIcon />
            </ListItemIcon>
            <ListItemText primary="Use Case" />
            {openSubUseCase ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubUseCase} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/use_case"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="all Use Case " />
              </ListItem>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/unapproved_use_case"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Unapproved" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/workflow"
            onClick={handleClickWorkFlow}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="WorkFlow" />
            {openSubWorkFlow ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubWorkFlow} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/workflow"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="WorkFlow" />
              </ListItem>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/create_workflow"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Create WorkFlow" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/outreachy"
            onClick={handleClickOutreachy}
          >
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Outreachy" />
            {openSubOutreachy ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubOutreachy} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/outreachy"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Outreachy" />
              </ListItem>
              <ListItem
                sx={{ pl: 3, color: "#000" }}
                component={NavLink}
                className={({ isActive }) =>
                  isActive ? classes.activeLink : undefined
                }
                to="/mile_upload"
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary="Upload Image " />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/subscribe_email"
          >
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="Subscribe Email" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/feedback"
          >
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={({ isActive }) =>
              isActive ? classes.activeLink : undefined
            }
            sx={{ color: "#000" }}
            to="/logout"
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <DrawerHeader />
        <Typography>{children}</Typography>
      </Box>
    </Box>
  );
}
