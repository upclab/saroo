import { observable } from 'mobx';

class ObservableUserStore {
  @observable
  user = {}

  setUser(user) {
    this.user = user;
  }

  removeUser() {
    this.user = null;
  }
}

const observableUserStore = new ObservableUserStore()

export default observableUserStore;
