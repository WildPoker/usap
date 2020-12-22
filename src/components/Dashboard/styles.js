import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "50px",
    backgroundColor: "transparent",
  },
  Typography: {
    height: "500px",
    backgroundColor: "#191d24",
    width: "600px",
    margin: "auto",
    overflow: "hidden",
    overflowY: "scroll",
  },
  buttonSend: {
    width: "100px",
    height: "100",
    marginLeft: "50px",
  },
  chatareaInput: {
    backgroundColor: "transparent",
    margin: "0 !important",
    padding: "0 !important",
    width: "450px",
  },
  multilineColor: {
    color: "white !important",
  },
  chatarea: {
    height: "50px",
    backgroundColor: "transparent",
    width: "600px",
    margin: "auto",
    marginTop: "10px",
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
  search: {
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
}));

export default useStyles;
