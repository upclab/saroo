import { Alert, AsyncStorage } from 'react-native';

import { auth } from '@/firebaseApp';

import UserStore from '@mobx/userStore';

export const USER_KEY_NAME = 'auth-demo-key';

export const onSignIn = userKey => AsyncStorage.setItem(USER_KEY_NAME, userKey);
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY_NAME);

auth.onAuthStateChanged((user) => {
  if (user != null) {
    onSignIn();
  } else {
    onSignOut();
  }
});

export function signInWithEmail(email, password) {
  return new Promise((resolve) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        onSignIn(user.uid);
        UserStore.setUserKey(user.uid);
        resolve();
      })
      .catch(() => {
        Alert.alert('Datos incorrectos!');
      });
  });
}

export const isSignedIn = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem(USER_KEY_NAME)
    .then((userKey) => {
      if (userKey !== null) {
        resolve({ isAuthenticated: true, userKey });
      } else {
        resolve(false);
      }
    })
    .catch(err => reject(err));
});

export async function signOut() {
  await auth.signOut();
  onSignOut();
  UserStore.removeUser();
}
