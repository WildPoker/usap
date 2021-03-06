import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    height: "60px",
    backgroundColor: "#30475e",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    padding: "0px !important",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  dialog: {
    width: "400px",
  },
  divMessage: {
    display: "block",
    margin: "25px",
  },
  buttonMessage: {
    borderRadius: "100%",
    float: "right",
  },
  messageHold: {
    display: "block",
    maxWidth: "100%",
    marginTop: "25px",
  },
  messageBox: {
    display: "inline-block",
    backgroundColor: "#30475e",
    padding: "10px 30px 10px 30px",
    borderRadius: "20px",
    color: "white",
    margin: "2px 0 0 10px",
    maxWidth: "80%",
    minHeight: "100%",
  },
  username: {
    margin: "2px 0 0 10px",
    color: "white",
  },

  otherUsername: {
    display: "block",
    margin: "2px 0 0 10px",
    color: "white",
  },
  otherMessageBox: {
    display: "inline-block",
    backgroundColor: "#6493c3",
    padding: "10px 30px 10px 30px",
    borderRadius: "20px",
    color: "white",
    margin: "2px 0 0 10px",
    maxWidth: "80%",
    minHeight: "100%",
  },
}));

export default useStyles;
