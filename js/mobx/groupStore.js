import { action, observable } from 'mobx';

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

  @action updateSelectedGroup(selectedGroupKey) {
    this.selectedGroupKey = selectedGroupKey;
  }
}

const groupStore = new GroupStore();
export default groupStore;
