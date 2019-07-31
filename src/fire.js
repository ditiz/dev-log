import firebase, { initializeApp, database } from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { async } from "q";

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
initializeApp(firebaseConfig);

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export const db = database();

export const auth = firebase.auth();

export async function createUserWithEmailAndPassword(email, password) {
  return await auth.createUserWithEmailAndPassword(email, password);
}

export async function signInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password);
}

export default firebase;