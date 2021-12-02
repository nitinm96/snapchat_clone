import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyC9eJkQDKsCsOjBql0wOf1SXiPSiVO78Gg",
    authDomain: "snapchat-clone-56064.firebaseapp.com",
    projectId: "snapchat-clone-56064",
    storageBucket: "snapchat-clone-56064.appspot.com",
    messagingSenderId: "978286688964",
    appId: "1:978286688964:web:c0e968ec28a4f15d096791"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider=  new firebase.auth.GoogleAuthProvider();

  export {db, auth, storage, provider};
