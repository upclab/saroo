import { action, computed, observable } from 'mobx';

import { db } from '@/firebaseApp';
import { snapshotToArray } from '@/utilities/firebaseUtils';

class GroupStore {
  constructor() {
    db.ref('groups').on('value', (snapshot) => {
      this.groups = snapshotToArray(snapshot);
    });
  }

  @observable groups = [];
  @observable selectedGroupKey = 'gr002';

  @action updateSelectedGroupKey(selectedGroupKey) {
    this.selectedGroupKey = selectedGroupKey;
  }

  @computed get selectedGroup() {
    const { selectedGroupKey } = this;
    return this.groups.find(group => group.key === selectedGroupKey);
  }
}

const groupStore = new GroupStore();
export default groupStore;
