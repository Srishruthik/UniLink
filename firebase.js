const firebaseConfig = {
    apiKey: "AIzaSyAuRTbehlawBa_yDwu3OY7l1CXxeESBj6s",
    authDomain: "unishare-f2ff9.firebaseapp.com",
    projectId: "unishare-f2ff9",
    storageBucket: "unishare-f2ff9.appspot.com",
    messagingSenderId: "475924595063",
    appId: "1:475924595063:web:8018a402346bec30e72172"
  };
  // Initialize Firebase
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import 'firebase/compat/firestore';
  import "firebase/firestore";
  import {getStorage} from "firebase/storage"

  let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}


const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = getStorage(app)
export {auth,firebase,storage,firestore};