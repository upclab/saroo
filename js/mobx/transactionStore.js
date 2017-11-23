import { action, computed, observable } from 'mobx';
import addMonths from 'date-fns/add_months';

import { transactionRef } from '@/firebaseApp';
import GroupStore from '@mobx/groupStore';

import { objectToArray } from '@utils/firebaseUtils';

export async function addTransaction({ name, meta, initialAmount }) {
  const newTransactionRef = transactionRef(GroupStore.selectedGroupKey).push();

  await newTransactionRef.set({
    name,
    meta,
    current: initialAmount,
  });
}

export const outlayTags = [
  {
    name: 'Comida',
    key: 'FOOD',
  },
  {
    name: 'Regalos',
    key: 'GIFT',
  },
  {
    name: 'Transporte',
    key: 'TRANS',
  },
  {
    name: 'Otros',
    key: 'OTHER',
  },
];

class TransactionStore {
  @observable transactions = {};
  @observable selectedDate = Date.now();

  @computed get monthTransactions() {
    const date = new Date(this.selectedDate);

    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();

    const yearKey = Object.keys(this.transactions).find(y => y === year);
    if (!yearKey) {
      return [];
    }

    const yearTransactionsObj = this.transactions[yearKey];
    const monthKey = Object.keys(yearTransactionsObj).find(m => m === month);
    if (!monthKey) {
      return [];
    }

    const monthTransactionsObj = yearTransactionsObj[monthKey];
    return objectToArray(monthTransactionsObj);
  }

  @action updateTransactions(transactions) {
    this.transactions = transactions;
  }

  @action updateDate(date) {
    this.selectedDate = date;
  }

  @action goToPreviousMonth() {
    this.selectedDate = addMonths(this.selectedDate, -1).getTime();
  }

  @action goToNextMonth() {
    this.selectedDate = addMonths(this.selectedDate, +1).getTime();
  }

  @action addIncome() {
    return this.todo || 'TODO';
  }

  @action addOutlay() {
    return this.todo || 'TODO';
  }
}

const transactionStore = new TransactionStore();
/* eslint-disable no-unused-expressions */
transactionStore.transactions;
transactionStore.selectedDate;

export default transactionStore;
