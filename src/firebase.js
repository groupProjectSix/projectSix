import firebase from 'firebase/app';
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyADqSGWHdf9gZ0cyhUXRzFNUK25bY1bVJw",
  authDomain: "projectsix-4cd1b.firebaseapp.com",
  databaseURL: "https://projectsix-4cd1b.firebaseio.com",
  projectId: "projectsix-4cd1b",
  storageBucket: "projectsix-4cd1b.appspot.com",
  messagingSenderId: "210565880710",
  appId: "1:210565880710:web:273bfb9a63f26bb0056a07"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//set up dbRef
const dbRef = firebase.database().ref();

export default dbRef;