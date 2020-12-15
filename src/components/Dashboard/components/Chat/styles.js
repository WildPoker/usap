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
}));

export default useStyles;
