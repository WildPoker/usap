import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const classes = useStyles();
  const { currentUser, logout, username } = useAuth();
  const history = useHistory();

  function handleLogout() {
    try {
      logout();
      history.push("/login");
    } catch {}
  }
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Usap {username}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
