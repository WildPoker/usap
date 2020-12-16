import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const classes = useStyles();
  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const history = useHistory();

  function handleSignup(e) {
    e.preventDefault();
    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const conPass = conPassRef.current.value;

    if (password !== conPass) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      signup(email, password, username);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSignup}>
          <InputLabel className={classes.label}>Username</InputLabel>
          <Input
            inputRef={userRef}
            name="username"
            autoFocus
            required
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            }
          />
          <InputLabel className={classes.label}>Email</InputLabel>
          <Input
            inputRef={emailRef}
            required
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
          {error && <InputLabel className={classes.error}>{error}</InputLabel>}
          <InputLabel className={classes.label}>Password</InputLabel>
          <Input
            inputRef={passRef}
            required
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
          />
          <InputLabel className={classes.label}>Confirm Password</InputLabel>
          <Input
            inputRef={conPassRef}
            type="password"
            required
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
          />
          <Button variant="outlined" className={classes.button} type="submit">
            Signup
          </Button>
        </form>
        <p className={classes.link}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
