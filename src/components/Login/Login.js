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
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(loginUser.email, loginUser.password);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleLogin}>
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
            value={loginUser.email}
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
            value={loginUser.password}
          />

          <Button
            disabled={loading}
            variant="outlined"
            className={classes.button}
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className={classes.link}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
