import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC8Ethv1wszou2AfUyolR1aUWUtSWc2PC0",
  authDomain: "pharmago-322720.firebaseapp.com",
  projectId: "pharmago-322720",
  storageBucket: "pharmago-322720.appspot.com",
  messagingSenderId: "677042429572",
  appId: "1:677042429572:web:0bbfd0116e60c6ae912cd1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
