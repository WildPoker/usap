import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import { db } from "../../../../Firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import "./Chat.css";
const Chatapp = () => {
  const classes = useStyles();
  const { username } = useAuth();
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    db.collection("Chats")
      .doc("Rooms")
      .collection("Room-1")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        divRef.current.scrollIntoView({ behavior: "smooth" });
      });
  }, []);

  return (
    <div>
      <Container className={classes.container}>
        <Typography component="div" className={classes.Typography}>
          {messages.map(({ id, data }) => {
            const str = data.username;
            const strLength = str.length;
            const chatUsername = str.slice(0, strLength - 5);
            const isUser = username === str;

            return (
              <div ref={divRef} key={id} className={classes.messageHold}>
                <p
                  className={isUser ? classes.username : classes.otherUsername}
                >
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
      </Container>
    </div>
  );
};

export default Chatapp;
