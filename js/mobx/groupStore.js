import { action, computed, observable } from 'mobx';

import SavingStore from '@mobx/savingStore';
import TransactionStore from '@mobx/transactionStore';

import { groupsRef, savingsRef, transactionsRef } from '@/firebaseApp';
import { snapshotToArray, snapshotToObject } from '@/utilities/firebaseUtils';

async function getGroup(groupKey) {
  return snapshotToObject(await groupsRef.child(groupKey).once('value'));
}

class GroupStore {
  @observable groups = [];
  @observable selectedGroupKey = null;

  @computed get selectedGroup() {
    const { selectedGroupKey } = this;
    return this.groups.find(group => group.key === selectedGroupKey);
  }

  @action async fetchGroupsforUser(groupList) {
    const groups = [];
    const groupKeys = Object.keys(groupList);

    for (let i = 0; i < groupKeys.length; i += 1) {
      const groupKey = groupKeys[i];
      const group = getGroup(groupKey);
      groups.push(group);
    }
    this.groups = await Promise.all(groups);
  }

  @action async updateSelectedGroupKey(selectedGroupKey, { fetchOnce } = {}) {
    // Unbind the old references
    if (this.selectedGroupKey) {
      savingsRef(this.selectedGroupKey).off();
      transactionsRef(this.selectedGroupKey).off();
    }

    // Bind the new References
    this.selectedGroupKey = selectedGroupKey;

    if (fetchOnce) {
      const p1 = savingsRef(this.selectedGroupKey).once('value');
      const p2 = transactionsRef(this.selectedGroupKey).once('value');

      const [quickSavingsSnapshot, quickTransactionsSnapshot] = await Promise.all([p1, p2]);

      if (quickSavingsSnapshot.val()) {
        SavingStore.updateSavings(snapshotToArray(quickSavingsSnapshot));
      }
      if (quickTransactionsSnapshot.val()) {
        TransactionStore.updateTransactions(quickTransactionsSnapshot.val());
      }
    }

    savingsRef(this.selectedGroupKey).on('value', (snapshot) => {
      if (snapshot.val()) {
        SavingStore.updateSavings(snapshotToArray(snapshot));
      }
    });

    transactionsRef(this.selectedGroupKey).on('value', (snapshot) => {
      if (snapshot.val()) {
        TransactionStore.updateTransactions(snapshot.val());
      }
    });
  }

  @action removeSelectedGroupKey() {
    savingsRef(this.selectedGroupKey).off();
    this.selectedGroupKey = null;
  }
}

const groupStore = new GroupStore();
/* eslint-disable no-unused-expressions */
groupStore.groups;
groupStore.selectedGroupKey;

export default groupStore;
