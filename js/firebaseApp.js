import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();

// References
export const usersRef = db.ref('users');
