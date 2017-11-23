import { action, observable } from 'mobx';

import { snapshotToArray } from '@/utilities/firebaseUtils';
import { usersRef } from '@/firebaseApp';

class UserStore {
  @observable users = [];
  @observable userKey = null;

  @action async fetchUsers() {
    const snapshot = await usersRef.once('value');
    this.users = snapshotToArray(snapshot);
  }

  @action setUserKey(userKey) {
    this.userKey = userKey;
  }

  @action removeUserKey() {
    this.userKey = null;
  }

  @action getUser(userKey) {
    return this.users.find(u => u.key === userKey);
  }
}

const userStore = new UserStore();
export default userStore;
