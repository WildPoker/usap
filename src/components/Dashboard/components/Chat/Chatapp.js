import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import { db } from "../../../../Firebase";
import { useAuth } from "../../../../contexts/AuthContext";
const Chatapp = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("Chats")
      .doc("Rooms")
      .collection("Room-1")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ message: doc.data() })));
      });
    console.log(currentUser);
  }, []);

  return (
    <Container className={classes.container}>
      <Typography component="div" className={classes.Typography}>
        {messages.map(({ message }) => {
          return (
            <div className={classes.messageHold}>
              <p
                style={{ wordBreak: "break-all", whiteSpace: "normal" }}
                className={classes.messageBox}
              >
                {message.message}
              </p>
            </div>
          );
        })}
      </Typography>
    </Container>
  );
};

export default Chatapp;
