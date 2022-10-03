import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  // apiKey: 'AIzaSyAzfmRYoAO1OOTe_y3VZtyZEiSOxgqw0wc',
  // authDomain: 'chat-f1040.firebaseapp.com',
  // projectId: 'chat-f1040',
  // storageBucket: 'chat-f1040.appspot.com',
  // messagingSenderId: '543007627295',
  // appId: '1:543007627295:web:65818ea366ff3fdd3c5d2a',
  apiKey: 'AIzaSyAzfmRYoAO1OOTe_y3VZtyZEiSOxgqw0wc',
  authDomain: 'chat-f1040.firebaseapp.com',
  databaseURL:
    'https://chat-f1040-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-f1040',
  storageBucket: 'chat-f1040.appspot.com',
  messagingSenderId: '543007627295',
  appId: '1:543007627295:web:65818ea366ff3fdd3c5d2a',
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
