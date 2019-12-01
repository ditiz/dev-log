import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhu54BxvtHFzolGfaiQtciH-WYnid4GF4",
  authDomain: "dev-log-dc4fb.firebaseapp.com",
  databaseURL: "https://dev-log-dc4fb.firebaseio.com",
  projectId: "dev-log-dc4fb",
  storageBucket: "dev-log-dc4fb.appspot.com",
  messagingSenderId: "436837082123",
  appId: "1:436837082123:web:3719f3a562876d84"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export async function createUserWithEmailAndPassword(email, password) {
  return await firebase.auth.createUserWithEmailAndPassword(email, password);
}

export async function signInWithEmailAndPassword(email, password) {
  firebase.auth.signInWithEmailAndPassword(email, password);
}

export default true;
