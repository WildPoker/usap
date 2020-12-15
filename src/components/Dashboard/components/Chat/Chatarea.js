import React, { useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Chatarea(props) {
  const classes = useStyles();
  const { chat } = useAuth();
  const chatInput = useRef();

  const handleClick = () => {
    chat(chatInput.current.value);
  };
  return (
    <div className={classes.chatarea}>
      <TextField
        inputRef={chatInput}
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
