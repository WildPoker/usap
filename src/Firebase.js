import "firebase/auth";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAabMY-55azii5XDeT4-eUOpkNnz0MvIGE",
  authDomain: "usap-4684f.firebaseapp.com",
  projectId: "usap-4684f",
  storageBucket: "usap-4684f.appspot.com",
  messagingSenderId: "1088975240365",
  appId: "1:1088975240365:web:17df80544a234c3d2a5a24",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const db = fire.firestore();

export { auth, db };
export default fire;
