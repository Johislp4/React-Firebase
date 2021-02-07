// importar solo las librerías que desee de Firebase (authentication, app, firestore etc)
import firebase from 'firebase/app'; 
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDkAFbNwvHCNaK3PcDIpJy0NOnT6JOCmm4",
    authDomain: "fb-crud-react-290fc.firebaseapp.com",
    projectId: "fb-crud-react-290fc",
    storageBucket: "fb-crud-react-290fc.appspot.com",
    messagingSenderId: "76791387052",
    appId: "1:76791387052:web:7ae04c33c7d3b0961d2009"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  //conexión a Firestore (para almacenar los datos)
  export const db = fb.firestore();

  