import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Chatapp from "./components/Chat/Chatapp";
import Chatarea from "./components/Chat/Chatarea";
import Chats from "./Chats";

const Background =
  "https://www.transparenttextures.com/patterns/inspiration-geometry.png";

function Dashboard() {
  const styles = {
    minHeight: "110vh",
    backgroundColor: "#222831",
    backgroundImage: `url(${Background})`,
  };
  return (
    <div style={styles}>
      <Nav />
      <Switch>
        <Route path="/chats/:id" exact component={Chats} />
      </Switch>
    </div>
  );
}

export default Dashboard;
