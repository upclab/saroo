import { AsyncStorage } from 'react-native';

import { firebaseApp, facebookAuthProvider } from '@/firebaseApp';

export const FACEBOOK_APP_ID = '1790249171273714';
export const USER_KEY_NAME = 'auth-demo-key';

export const onSignIn = () => AsyncStorage.setItem(USER_KEY_NAME, 'true');

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log(user);
  }
});

export async function signInWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    FACEBOOK_APP_ID,
    {
      permissions: [
        'public_profile',
        'user_friends',
      ],
    },
  );

  if (type === 'success') {
    const credential = facebookAuthProvider.credential(token);

    firebaseApp.auth().signInWithCredential(credential)
      .then((user) => {
        onSignIn();
        return Promise.resolve(user);
      })
      .catch(error => Promise.reject(error));
  }
  return Promise.reject(new Error('auth/expo-facebook-login-error'));
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY_NAME);

export const isSignedIn = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem(USER_KEY_NAME)
    .then((res) => {
      if (res !== null) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch(err => reject(err));
});
