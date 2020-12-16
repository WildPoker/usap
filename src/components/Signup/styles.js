import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: "#222831",
    display: "flex",
  },
  card: {
    width: "300px",
    backgroundColor: "#eeeeee",
    textAlign: "center",
    height: "500px",
    margin: "auto",
  },
  error: {
    color: "red",
  },
  label: {
    margin: "40px 0 0 0",
  },
  button: {
    marginTop: "30px",
  },
  link: {
    marginTop: "30px",
  },
}));

export default useStyles;
