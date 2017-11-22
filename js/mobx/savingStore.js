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

  @action getSaving(savingKey) {
    return this.savings.find(s => s.key === savingKey);
  }

  @action getSavingName(savingKey) {
    if (!savingKey) {
      return (null);
    }
    const saving = this.getSaving(savingKey);
    return saving ? saving.name : (null);
  }
}

const savingStore = new SavingStore();
/* eslint-disable no-unused-expressions */
savingStore.savings;

export default savingStore;
