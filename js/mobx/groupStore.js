import { action, computed, observable } from 'mobx';

import SavingStore from '@mobx/savingStore';

import { groupsRef, savingsRef } from '@/firebaseApp';
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

  @action async updateSelectedGroupKey(selectedGroupKey) {
    // Unbind the old references
    if (this.selectedGroupKey) {
      savingsRef(this.selectedGroupKey).off();
    }

    // Bind the new References
    this.selectedGroupKey = selectedGroupKey;

    savingsRef(this.selectedGroupKey).on('value', (snapshot) => {
      SavingStore.updataSavings(snapshotToArray(snapshot));
    });
  }

  @action removeSelectedGroupKey() {
    savingsRef(this.selectedGroupKey).off();
    this.selectedGroupKey = null;
  }
}

const groupStore = new GroupStore();
export default groupStore;
