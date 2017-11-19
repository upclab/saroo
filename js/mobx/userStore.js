import { action, observable } from 'mobx';

import { db } from '@/firebaseApp';
import { snapshotToArray } from '@/utilities/firebaseUtils';

class UserStore {
  constructor() {
    db.ref('users').once('value')
      .then((snapshot) => {
        this.users = snapshotToArray(snapshot);
      });
  }

  @observable users = [];
  @observable userKey = null;

  @action setUserKey(userKey) {
    this.userKey = userKey;
  }

  @action removeUser() {
    this.userKey = null;
  }
}

const userStore = new UserStore();
export default userStore;
