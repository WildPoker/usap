import { makeStyles } from "@material-ui/core/styles";

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
    margin: "0",
    padding: "0",
    width: "500px",
  },
  multilineColor: {
    color: "white",
  },
  buttonSend: {
    width: "100px",
    height: "100",
  },
}));

export default useStyles;
