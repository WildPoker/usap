import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function tryingthis() {
    return console.log("Working!");
  }

  function signup(email, password, username) {
    const seq = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        db.collection("users")
          .doc(username + "#" + seq)
          .collection("user-data")
          .doc("user-info")
          .set({
            username: username + "#" + seq,
            email: email,
          });
      });
  }

  function chat(chat) {
    return db
      .collection("Chats")
      .doc("Rooms")
      .collection("Room-1")
      .add({
        sender: currentUser.email,
        message: chat,
      })
      .then(function () {
        console.log("Successfully Send");
      })
      .catch(function (err) {
        console.log(err);
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
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    tryingthis,
    chat,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
