import Nav from "./components/Nav";
import Chatapp from "./components/Chat/Chatapp";
import Chatarea from "./components/Chat/Chatarea";

const Background =
  "https://www.transparenttextures.com/patterns/inspiration-geometry.png";

function Dashboard() {
  const styles = {
    minHeight: "100vh",
    backgroundColor: "#222831",
    backgroundImage: `url(${Background})`,
  };
  return (
    <div style={styles}>
      <Nav />
      <Chatapp />
      <Chatarea />
    </div>
  );
}

export default Dashboard;
