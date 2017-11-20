import { action, observable } from 'mobx';

class MainStore {
  @observable isLoading = false;

  @action showLoader() {
    this.isLoading = true;
  }

  @action hideLoader() {
    this.isLoading = false;
  }
}

const mainStore = new MainStore();
export default mainStore;
