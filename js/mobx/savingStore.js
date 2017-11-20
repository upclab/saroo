import { action, observable } from 'mobx';

class SavingStore {
  @observable savings = [];

  @action updateSavings(savings) {
    this.savings = savings;
  }
}

const savingStore = new SavingStore();
export default savingStore;
