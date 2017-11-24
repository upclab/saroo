import { action, observable } from 'mobx';

import { snapshotToArray } from '@/utilities/firebaseUtils';
import { banksRef } from '@/firebaseApp';

class BankStore {
  @observable banks = [];

  @action async fetchBanks() {
    const snapshot = await banksRef.once('value');
    this.banks = snapshotToArray(snapshot);
  }

  @action getBank(bankKey) {
    return this.banks.find(u => u.key === bankKey);
  }
}

const bankStore = new BankStore();
/* eslint-disable no-unused-expressions */
bankStore.banks;

export default bankStore;
