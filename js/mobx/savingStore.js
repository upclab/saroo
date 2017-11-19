import { action, observable } from 'mobx';

class SavingStore {
  @observable savings = [];

  @action updataSavings(savings) {
    this.savings = savings;
  }
}

const savingStore = new SavingStore();
export default savingStore;
