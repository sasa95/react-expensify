import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEX6H127ztXW4yslnTGbkHdakWnvoHarM',
  authDomain: 'expensify-2bbd9.firebaseapp.com',
  databaseURL: 'https://expensify-2bbd9.firebaseio.com',
  projectId: 'expensify-2bbd9',
  storageBucket: 'expensify-2bbd9.appspot.com',
  messagingSenderId: '588283921212',
  appId: '1:588283921212:web:400a3b576a4889e2529439'
};

firebase.initializeApp(firebaseConfig);

const fs = firebase.firestore();

export { firebase, fs as default };
