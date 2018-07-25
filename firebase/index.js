import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export default firebase;