import { action, observable } from 'mobx';

import { savingsRef } from '@/firebaseApp';
import GroupStore from '@mobx/groupStore';

export async function addSaving({ name, meta, initialAmount }) {
  const newSavingRef = savingsRef(GroupStore.selectedGroupKey).push();

  await newSavingRef.set({
    name,
    meta,
    current: initialAmount,
  });
}

class SavingStore {
  @observable savings = [];

  @action updateSavings(savings) {
    this.savings = savings;
  }
}

const savingStore = new SavingStore();
export default savingStore;
