import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyCuZjfQIszAgPPU_N9zPXr-3syTgqioA6I",
  authDomain: "social-media-app-vue.firebaseapp.com",
  projectId: "social-media-app-vue",
  storageBucket: "social-media-app-vue.appspot.com",
  messagingSenderId: "1095157347429",
  appId: "1:1095157347429:web:dababa6c8c0440a3e9028c"
};

// Initialize Firebase
if(!firebase.apps.length){
  let app = initializeApp(firebaseConfig);
}

export default firebase;
