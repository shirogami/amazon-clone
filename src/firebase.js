// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyB4-SxDx8JAVQK8dUfpeoQV8fhIAwMN3RQ",
    authDomain: "clone-55044.firebaseapp.com",
    projectId: "clone-55044",
    storageBucket: "clone-55044.appspot.com",
    messagingSenderId: "45734260278",
    appId: "1:45734260278:web:b580e02d0cab35ebbf3297",
    measurementId: "G-CGSVW9MK9S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };