import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
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
