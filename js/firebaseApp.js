import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

// References
export const usersRef = db.ref('users');
export const banksRef = db.ref('banks');
export const groupsRef = db.ref('groups');
export const groupListRef = userKey => db.ref('users_groups').child(userKey);
export const savingsRef = groupKey => db.ref('savings_groups').child(groupKey);
export const transactionsRef = groupKey => db.ref('transactions_groups').child(groupKey);
