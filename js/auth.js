import Expo from 'expo';
import { AsyncStorage } from 'react-native';

import { auth, facebookAuthProvider, googleAuthProvider } from '@/firebaseApp';

export const FACEBOOK_APP_ID = '1790249171273714';
export const GOOGLE_IOS_CLIENT_ID = '928875904475-om9732sk1q44auj7tf67pfdgjmhec7jb.apps.googleusercontent.com';
export const GOOGLE_ANDROID_CLIENT_ID = '928875904475-be61j3jbr6gdqm9nnhh0qqiejcm1bqd9.apps.googleusercontent.com';

export const USER_KEY_NAME = 'auth-demo-key';

export const onSignIn = () => AsyncStorage.setItem(USER_KEY_NAME, 'true');
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY_NAME);

auth.onAuthStateChanged((user) => {
  if (user != null) {
    onSignIn();
  } else {
    onSignOut();
  }
});

export async function signInWithGoogle() {
  const { type, accessToken } = await Expo.Google.logInAsync({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  if (type === 'success') {
    const credential = googleAuthProvider.credential(null, accessToken);

    await auth.signInWithCredential(credential)
      .then(user => Promise.resolve(user))
      .catch(error => Promise.reject(error));
  } else {
    Promise.reject(new Error('auth/expo-google-login-error'));
  }
}

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

    await auth.signInWithCredential(credential)
      .then(user => Promise.resolve(user))
      .catch(error => Promise.reject(error));
  } else {
    Promise.reject(new Error('auth/expo-facebook-login-error'));
  }
}

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
