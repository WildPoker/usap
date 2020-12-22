import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/Chat";
import useStyles from "./styles";
import firebase from "firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { db } from "../../../Firebase";

const Nav = () => {
  const classes = useStyles();
  const { logout, username, currentUser, settingRoomId } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [friendOpen, setFriendOpen] = useState(false);
  const search = useRef();
  const [searchFound, setSearchFound] = useState("");
  const [friendList, setFriendList] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setFriendOpen(false);
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

  const handleFriends = (e) => {
    setFriendOpen(true);
  };

  const friendsSearch = () => {
    if (search.current.value === "") {
      setSearchFound("No users Found!");
    } else {
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
  };

  const handleClick = (e) => {
    const currentEmail = currentUser.email;
    const otherEmail = search.current.value;
    const roomIdNumber = Math.floor(100000 + Math.random() * 900000);
    db.collection("users")
      .doc(currentEmail)
      .collection("user-data")
      .doc("user-friends")
      .collection("friend-lists")
      .doc(otherEmail)
      .set({
        email: otherEmail.toLowerCase(),
        username: searchFound,
        added: firebase.firestore.FieldValue.serverTimestamp(),
        roomId: roomIdNumber,
      })
      .then(function () {
        console.log("Successfully added");
      })
      .catch(function (err) {
        console.log(err);
      });

    db.collection("users")
      .doc(otherEmail)
      .collection("user-data")
      .doc("user-friends")
      .collection("friend-lists")
      .doc(currentUser.email)
      .set({
        email: currentUser.email,
        username: username,
        added: firebase.firestore.FieldValue.serverTimestamp(),
        roomId: roomIdNumber,
      });
  };

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.email)
      .collection("user-data")
      .doc("user-friends")
      .collection("friend-lists")
      .onSnapshot((snapshot) => {
        setFriendList(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const otherEmail = e.target.innerText;
    settingRoomId(otherEmail);
  };
  return (
    <div style={{ display: "block" }}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div style={{ display: "inline-block", marginRight: "50px" }}>
              Usap
            </div>
            <div style={{ display: "inline-block" }}>
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
            </div>
            <Button variant="contained" color="primary" onClick={handleFriends}>
              Friends
            </Button>
          </Typography>

          <a style={{ marginRight: "50px" }}>{username}</a>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
        <Dialog open={open} keepMounted onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              <div>{searchFound ? searchFound : searchFound}</div>
              {searchFound ? (
                <Button style={{ borderRadius: "50%" }} onClick={handleClick}>
                  <PersonAddIcon />
                </Button>
              ) : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={friendOpen} keepMounted onClose={handleClose}>
          <DialogContent className={classes.dialog}>
            <DialogContentText>
              {friendList.map(({ id, data }) => {
                const email = data.email;

                return (
                  <div key={id} className={classes.divMessage}>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                      <a>{email}</a>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.buttonMessage}
                      >
                        <ChatIcon />
                      </Button>
                    </form>
                  </div>
                );
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    </div>
  );
};

export default Nav;
