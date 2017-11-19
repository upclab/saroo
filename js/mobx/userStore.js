import { action, observable } from 'mobx';

class UserStore {
  @observable users = [];
  @observable userKey = null;

  @action setUserKey(userKey) {
    this.userKey = userKey;
  }

  @action removeUserKey() {
    this.userKey = null;
  }
}

const userStore = new UserStore();
export default userStore;
