import React, { useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Chatarea(props) {
  const classes = useStyles();
  const { chat, currentUser, username } = useAuth();
  const [chatInput, setChatInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setChatInput(value);
  };

  const handleClick = () => {
    chat(chatInput);
    setChatInput("");
  };

  return (
    <div className={classes.chatarea}>
      <TextField
        onChange={handleChange}
        value={chatInput}
        className={classes.chatareaInput}
        autoFocus={true}
        placeholder="Chat Area"
        margin="normal"
        InputProps={{
          className: classes.multilineColor,
        }}
      />
      <Button
        className={classes.buttonSend}
        variant="outlined"
        color="secondary"
        onClick={handleClick}
      >
        Send
      </Button>
    </div>
  );
}

export default Chatarea;
