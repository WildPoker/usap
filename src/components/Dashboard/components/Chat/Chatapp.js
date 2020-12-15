import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import { db } from "../../../../Firebase";
const Chatapp = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("Testing").onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ message: doc.data() })));
    });
    console.log(messages);
  }, []);

  // function readChat() {
  //   const docRef = db
  //     .collection("chat")
  //     .doc("room-1")
  //     .collection("chats")
  //     .doc("hORoK317n0XGb8ZJNuLa");
  //   return docRef
  //     .get()
  //     .then(function (doc) {
  //       if (doc.exists) {
  //         setChat({ id: doc.id, chat: doc.data() });
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting document:", error);
  //     });
  // }
  return (
    <Container className={classes.container}>
      <Typography component="div" className={classes.Typography}>
        {messages.map(({ message }) => {
          <p>{message.message}</p>;
        })}
      </Typography>
    </Container>
  );
};

export default Chatapp;
