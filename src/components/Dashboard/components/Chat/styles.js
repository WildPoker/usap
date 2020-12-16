import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "50px",
    backgroundColor: "transparent",
  },
  Typography: {
    height: "500px",
    backgroundColor: "#e8e8e8",
    width: "600px",
    margin: "auto",
    overflow: "hidden",
    overflowY: "scroll",
  },
  chatarea: {
    height: "50px",
    backgroundColor: "transparent",
    width: "600px",
    margin: "auto",
    marginTop: "10px",
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
  buttonSend: {
    width: "100px",
    height: "100",
    marginLeft: "50px",
  },
  messageHold: {
    display: "block",
    maxWidth: "100%",
    marginTop: "25px",
  },
  messageBox: {
    display: "inline-block",
    backgroundColor: "blue",
    padding: "10px 30px 10px 30px",
    borderRadius: "20px",
    color: "white",
    margin: "2px 0 0 10px",
    maxWidth: "80%",
    minHeight: "100%",
  },
  username: {
    margin: "2px 0 0 10px",
  },
}));

export default useStyles;
