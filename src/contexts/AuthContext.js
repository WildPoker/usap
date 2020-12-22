import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../Firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  async function signup(lowerEmail, password, username) {
    const seq = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    return auth
      .createUserWithEmailAndPassword(lowerEmail, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        db.collection("users")
          .doc(lowerEmail)
          .collection("user-data")
          .doc("user-info")
          .set({
            username: username + "#" + seq,
            email: lowerEmail,
            joined: firebase.firestore.FieldValue.serverTimestamp(),
          });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      settingUsername(user);
    });

    return unsubscribe;
  }, []);

  async function settingRoomId(email) {
    const docRef = db
      .collection("users")
      .doc(currentUser.email)
      .collection("user-data")
      .doc("user-friends")
      .collection("friend-lists")
      .doc(email);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data();
        history.push(`/chats/${data.roomId}`);
        setRoomId(data.roomId);
        readChat(data.roomId);
      } else {
        console.log("No Such Document!");
      }
    });
  }

  function readChat(newId) {
    db.collection("Chats")
      .doc("Rooms")
      .collection(newId.toString())
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }
  function SendMessage(chat) {
    const id = roomId.toString();
    const docRef = db.collection("Chats").doc("Rooms").collection(id);

    docRef
      .add({
        sender: currentUser.email.toLowerCase(),
        username: username,
        message: chat,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function settingUsername(user) {
    const lowerEmail = user.email.toLowerCase();
    const usernameRef = db
      .collection("users")
      .doc(lowerEmail)
      .collection("user-data")
      .doc("user-info");
    usernameRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const data = doc.data();
          setUsername(data.username);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  const value = {
    currentUser,
    username,
    roomId,
    messages,
    login,
    signup,
    logout,
    settingRoomId,
    SendMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
