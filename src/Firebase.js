//init firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

var app = firebase.initializeApp({
  apiKey: 'AIzaSyDC1Blg0QBOrToz5tF30x1KhVzINtQo4qU',
  authDomain: 'sandwiches-d43c1.firebaseapp.com',
  databaseURL: 'https://sandwiches-d43c1.firebaseio.com',
  projectId: 'sandwiches-d43c1',
  storageBucket: 'sandwiches-d43c1.appspot.com',
  messagingSenderId: '69550797545',
  appId: '1:69550797545:web:a6c030079982a4da'
});
// Initialize Firebase
const storage = app.firestore();
export { storage };
