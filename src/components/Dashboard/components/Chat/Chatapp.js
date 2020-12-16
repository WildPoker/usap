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
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <Container className={classes.container}>
      <Typography component="div" className={classes.Typography}>
        {messages.map(({ id, data }) => {
          return (
            <div className={classes.messageHold}>
              <p className={classes.username}>{data.username}</p>
              <p
                key={id}
                style={{ wordBreak: "break-all", whiteSpace: "normal" }}
                className={classes.messageBox}
              >
                {data.message}
              </p>
            </div>
          );
        })}
      </Typography>
    </Container>
  );
};

export default Chatapp;
