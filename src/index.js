import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8Ethv1wszou2AfUyolR1aUWUtSWc2PC0",
  authDomain: "pharmago-322720.firebaseapp.com",
  projectId: "pharmago-322720",
  storageBucket: "pharmago-322720.appspot.com",
  messagingSenderId: "677042429572",
  appId: "1:677042429572:web:0bbfd0116e60c6ae912cd1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
