import * as firebase from 'firebase';

import firebaseConfig from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();

// Auth Providers
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

// References
export const usersRef = db.ref('users');
