import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCB07Bmg8GtxFzwMVcR8hNFpaVqSliBJU8",
  authDomain: "go-cash-back-web.firebaseapp.com",
  databaseURL: "https://go-cash-back-web.firebaseio.com",
  projectId: "go-cash-back-web",
  storageBucket: "go-cash-back-web.appspot.com",
  messagingSenderId: "264926724995",
  appId: "1:264926724995:web:4ac6e8d5b99e834bd12cb6",
  measurementId: "G-NHLNZPS65H"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
