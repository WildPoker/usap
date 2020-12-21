import React, { useState, useRef, useEffect } from "react";
import { db } from "../../Firebase";
import { useAuth } from "../../contexts/AuthContext";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Chats = () => {
  const classes = useStyles();
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const { roomId, currentUser, username, SendMessage } = useAuth();
  const divRef = useRef(null);

  useEffect(() => {
    db.collection("Chats")
      .doc("Rooms")
      .collection("957200")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [roomId]);

  function handleClick() {
    SendMessage(chatRef.current.value);
  }

  return (
    <Container className={classes.container}>
      <Typography component="div" className={classes.Typography}>
        {messages.map(({ id, data }) => {
          const str = data.username;
          const strLength = str.length;
          const chatUsername = str.slice(0, strLength - 5);
          const isUser = username === str;

          return (
            <div ref={divRef} key={id} className={classes.messageHold}>
              <p className={isUser ? classes.username : classes.otherUsername}>
                {chatUsername}
              </p>
              <div>
                <p
                  key={id}
                  style={{ wordBreak: "break-all", whiteSpace: "normal" }}
                  className={
                    isUser ? classes.messageBox : classes.otherMessageBox
                  }
                >
                  {data.message}
                </p>
              </div>
            </div>
          );
        })}
      </Typography>
      <div className={classes.chatarea}>
        <TextField
          inputRef={chatRef}
          className={classes.chatareaInput}
          autoFocus={true}
          placeholder="Chat Area"
          margin="normal"
          InputProps={{
            className: classes.multilineColor,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonSend}
          endIcon={<SendIcon>send</SendIcon>}
          onClick={handleClick}
        ></Button>
      </div>
    </Container>
  );
};

export default Chats;
