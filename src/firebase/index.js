import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC87eUHqMmNmSd5RrxYVW8Bn74SHYcEx0s",
  authDomain: "g-learn-65707.firebaseapp.com",
  databaseURL:"gs://g-learn-65707.appspot.com",
  projectId: "g-learn-65707",
  storageBucket: "g-learn-65707.appspot.com",
  messagingSenderId: "937171801775",
  appId: "1:937171801775:web:e9cff5d1f4ea583778265a",
  measurementId: "G-5TNQJ6J4XC"
};

firebase.initializeApp(firebaseConfig);



const storage = firebase.storage()
const db = firebase.firestore()

export{storage, db, firebase as default};