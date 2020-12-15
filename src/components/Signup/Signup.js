import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const classes = useStyles();

  const [signupUser, setSignupUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const { signup, storeData } = useAuth();
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  function handleSignup(e) {
    e.preventDefault();

    if (signupUser.password !== signupUser.passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      signup(signupUser.email, signupUser.password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSignup}>
          <InputLabel
            htmlFor="input-with-icon-adornment"
            className={classes.input}
          >
            Email
          </InputLabel>

          <Input
            onChange={handleChange}
            name="email"
            autoFocus
            required
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
          {error && <InputLabel className={classes.error}>{error}</InputLabel>}
          <InputLabel
            htmlFor="input-with-icon-adornment"
            className={classes.input}
          >
            Password
          </InputLabel>
          <Input
            onChange={handleChange}
            name="password"
            required
            type="password"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
          />
          <InputLabel
            htmlFor="input-with-icon-adornment"
            className={classes.input}
          >
            Confirm Password
          </InputLabel>
          <Input
            onChange={handleChange}
            name="passwordConfirm"
            type="password"
            required
            id="input-with-icon-adornment"
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
