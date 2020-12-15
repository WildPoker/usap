import "firebase/auth";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_dW7F0zDqL0uF_-3Yd313TaQMgbfx_-c",
  authDomain: "trying-authen.firebaseapp.com",
  databaseURL: "https://trying-authen-default-rtdb.firebaseio.com",
  projectId: "trying-authen",
  storageBucket: "trying-authen.appspot.com",
  messagingSenderId: "489776804631",
  appId: "1:489776804631:web:846e442df5d4f5e53cfd52",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const db = fire.firestore();

export { auth, db };
export default fire;
