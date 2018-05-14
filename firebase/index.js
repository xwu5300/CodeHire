import * as firebase from 'firebase';
import { firebaseConfig } from '../config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export default firebase;