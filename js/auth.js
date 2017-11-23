import { AsyncStorage } from 'react-native';

import { auth, groupListRef } from '@/firebaseApp';

import UserStore from '@mobx/userStore';
import GroupStore from '@mobx/groupStore';

import firstKey from '@/utilities/firstKey';

export const USER_KEY_NAME = 'signed-user-key';
export const GROUP_KEY_NAME = 'selected-group-key';

export const onSignIn = userKey => AsyncStorage.setItem(USER_KEY_NAME, userKey);
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY_NAME);

auth.onAuthStateChanged((user) => {
  if (user != null) {
    onSignIn();
  } else {
    onSignOut();
  }
});

export async function signInWithEmail(email, password) {
  let user = null;

  try {
    user = await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    return Promise.reject();
  }

  // Add userKey to Storage and Store
  onSignIn(user.uid);
  UserStore.setUserKey(user.uid);

  // Add selectedGroupKey to Storage and Store
  const snapshot = await groupListRef(user.uid).once('value');
  const groupList = snapshot.val();
  const defaultGroupKey = firstKey(groupList);

  const p1 = UserStore.fetchUsers();
  const p2 = GroupStore.fetchGroupsforUser(groupList);
  const p3 = GroupStore.updateSelectedGroupKey(defaultGroupKey);

  AsyncStorage.setItem(GROUP_KEY_NAME, defaultGroupKey);
  await Promise.all([p1, p2, p3]);
  return Promise.resolve();
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
  UserStore.removeUserKey();
  GroupStore.removeSelectedGroupKey();
}
