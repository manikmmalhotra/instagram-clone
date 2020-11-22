  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWEZd6fBq41pt_Vq6iYRHovST3CZp2qE0",
    authDomain: "instagram-clone-e7a31.firebaseapp.com",
    databaseURL: "https://instagram-clone-e7a31.firebaseio.com",
    projectId: "instagram-clone-e7a31",
    storageBucket: "instagram-clone-e7a31.appspot.com",
    messagingSenderId: "274696539806",
    appId: "1:274696539806:web:974f0b2e772501dd93758f",
    measurementId: "G-F7KGLEMVV3"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};