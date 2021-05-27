import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyD3bjuWbzYRvZQ7Ve2VvhLgbNvdAlZZ0gw",
  authDomain: "proyectofinalparadigmas.firebaseapp.com",
  projectId: "proyectofinalparadigmas",
  storageBucket: "proyectofinalparadigmas.appspot.com",
  messagingSenderId: "93907763100",
  appId: "1:93907763100:web:77abc59903ab7fc5d85259"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();  