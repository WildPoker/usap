import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

function Chatarea(props) {
  const classes = useStyles();
  const { chat } = useAuth();
  const [chatInput, setChatInput] = useState("");
  const [chatErr, setChatErr] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setChatInput(value);
  };

  const handleClick = () => {
    if (!chatInput) {
      setChatErr("Message field is empty");
    } else {
      chat(chatInput);
      setChatInput("");
    }
  };

  return (
    <div className={classes.chatarea}>
      <TextField
        error={chatInput ? null : true}
        onChange={handleChange}
        value={chatInput}
        className={classes.chatareaInput}
        autoFocus={true}
        placeholder="Chat Area"
        margin="normal"
        InputProps={{
          className: classes.multilineColor,
        }}
        helperText={chatInput ? null : chatErr}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonSend}
        endIcon={<SendIcon>send</SendIcon>}
        onClick={handleClick}
      >
        Send
      </Button>
    </div>
  );
}

export default Chatarea;
