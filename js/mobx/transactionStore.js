import { action, computed, observable } from 'mobx';
import addMonths from 'date-fns/add_months';

import { transactionsRef, savingsRef } from '@/firebaseApp';
import SavingStore from '@mobx/savingStore';
import GroupStore from '@mobx/groupStore';
import UserStore from '@mobx/userStore';

import { objectToArray } from '@utils/firebaseUtils';

export function transactionRefByTime(time) {
  const date = new Date(time);
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();

  return transactionsRef(GroupStore.selectedGroupKey)
    .child(`Y${year}`)
    .child(`M${month}`);
}

export async function updateSaving(savingKey, amount) {
  if (savingKey) {
    const savingRef = savingsRef(GroupStore.selectedGroupKey).child(savingKey);
    const newAmount = Number(SavingStore.getSaving(savingKey).current) + Number(amount);
    await savingRef.update({ current: newAmount });
  }
  return Promise.resolve();
}

export async function addIncome(income) {
  const { userKey } = UserStore;
  const incomeObj = { userKey, ...income };

  const newIncomeRef = transactionRefByTime(income.date).push();
  const p1 = newIncomeRef.set(incomeObj);
  const p2 = updateSaving(income.savingKey, income.amount);

  await Promise.all([p1, p2]);
}

export async function addOutlay(outlay) {
  const { userKey } = UserStore;
  const outlayObj = { userKey, ...outlay };

  const newOutlayRef = transactionRefByTime(outlay.date).push();
  await newOutlayRef.set(outlayObj);
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

export function getOutlayTag(outlayTagKey) {
  return outlayTags.find(o => o.key === outlayTagKey);
}

export function getOutlayTagName(outlayTagKey) {
  if (!outlayTagKey) {
    return (null);
  }
  return getOutlayTag(outlayTagKey).name;
}

class TransactionStore {
  @observable transactions = {};
  @observable selectedDate = Date.now();

  @computed get monthTransactions() {
    const date = new Date(this.selectedDate);

    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const yearKey = Object.keys(this.transactions).find(y => y === `Y${year}`);
    if (!yearKey) {
      return [];
    }

    const yearTransactionsObj = this.transactions[yearKey];
    const monthKey = Object.keys(yearTransactionsObj).find(m => m === `M${month}`);
    if (!monthKey) {
      return [];
    }

    const monthTransactionsObj = yearTransactionsObj[monthKey];
    return objectToArray(monthTransactionsObj).sort((a, b) => b.date - a.date);
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
}

const transactionStore = new TransactionStore();
/* eslint-disable no-unused-expressions */
transactionStore.transactions;
transactionStore.selectedDate;

export default transactionStore;
