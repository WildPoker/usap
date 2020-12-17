import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  function signup(lowerEmail, password, username) {
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
  function chat(chat) {
    return db
      .collection("Chats")
      .doc("Rooms")
      .collection("Room-1")
      .add({
        sender: currentUser.email.toLowerCase(),
        username: username,
        message: chat,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log("Successfully Send");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const value = {
    currentUser,
    username,
    login,
    signup,
    logout,

    chat,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
