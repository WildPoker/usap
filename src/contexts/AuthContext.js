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

  function signup(email, password) {
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
          .doc(email)
          .collection("user-data")
          .doc("user-info")
          .set({
            email: email,
          });
      });
  }

  function chat(chat) {
    return db
      .collection("chat")
      .doc("room-1")
      .collection("chats")
      .add({
        chat: chat,
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
