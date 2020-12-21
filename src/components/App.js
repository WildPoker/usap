import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
