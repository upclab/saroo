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
  @observable userKey = 'usr0010';

  @action setUser(user) {
    this.user = user;
  }

  @action removeUser() {
    this.user = null;
  }
}

const userStore = new UserStore();
export default userStore;
