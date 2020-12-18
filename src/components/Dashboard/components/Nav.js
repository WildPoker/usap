import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useStyles from "./styles";
import firebase from "firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState, forwardRef, useRef } from "react";
import { db } from "../../../Firebase";

const Nav = () => {
  const classes = useStyles();
  const { logout, username, currentUser } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const search = useRef();
  const [searchFound, setSearchFound] = useState("");

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function friendsSearch() {
    db.collection("users")
      .doc(search.current.value)
      .collection("user-data")
      .doc("user-info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const data = doc.data();
          setSearchFound(data.username);
        }
      });
  }
  function handleClick() {
    db.collection("users")
      .doc(currentUser.email)
      .collection("user-data")
      .doc("user-friends")
      .collection(search.current.value)
      .add({
        email: currentUser.email.toLowerCase(),
        username: searchFound,
        added: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log("Successfully added");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      setOpen(true);
      friendsSearch();
    }
  }

  function handleLogout() {
    try {
      logout();
      history.push("/login");
    } catch {}
  }
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Usap {username}
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onKeyPress={handleKeyDown}
            inputRef={search}
          />
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>{searchFound ? searchFound : "user not found!"}</div>
            {searchFound ? (
              <PersonAddIcon
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              />
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Nav;
