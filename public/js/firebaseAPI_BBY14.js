//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyCFT7OSaZ2c2xyfbww_dY0qMbupj4kG-do",
  authDomain: "ecohabit-81866.firebaseapp.com",
  projectId: "ecohabit-81866",
  storageBucket: "ecohabit-81866.appspot.com",
  messagingSenderId: "852618059202",
  appId: "1:852618059202:web:fcffdf15b13d1b102d0a5b",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//storage for profile pic etc
var storage = firebase.storage();
