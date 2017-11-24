import { action, computed, observable } from 'mobx';

import { savingsRef } from '@/firebaseApp';
import GroupStore from '@mobx/groupStore';
import TransactionStore from '@mobx/transactionStore';
import BankStore from '@mobx/bankStore';

import { MONTHS_FOR_LOANS, RATES_ANUAL } from '@lib/params';
import { frenchFee, effectiveAnualToMonthly } from '@lib/rates';

import { objectToArray } from '@utils/firebaseUtils';

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
  @observable savingKey = null;

  @computed get selectedSaving() {
    if (!this.savingKey) {
      return null;
    }
    return this.getSaving(this.savingKey);
  }

  @computed get transactions() {
    if (!this.savingKey) {
      return [];
    }
    let transactionsArray = [];
    const transactionsObj = TransactionStore.transactions;
    
    Object.keys(transactionsObj).forEach((year) => {
      const yearObj = transactionsObj[year];
      Object.keys(yearObj).forEach((month) => {
        const monthObj = yearObj[month];
        const monthArray = objectToArray(monthObj);
        transactionsArray = transactionsArray.concat(monthArray);
      });
    });
    return transactionsArray.filter(t => t.savingKey === this.savingKey);
  }

  @computed get loans() {
    if (!this.savingKey) {
      return [];
    }

    const loansArray = [];
    const saving = this.selectedSaving;
    const amount = Number(saving.meta) - Number(saving.current);

    const { banks } = BankStore;

    banks.forEach((bank) => {
      const months = MONTHS_FOR_LOANS[Math.floor(Math.random() * MONTHS_FOR_LOANS.length)];
      const rate = RATES_ANUAL[Math.floor(Math.random() * RATES_ANUAL.length)];
      const payment = frenchFee(amount, effectiveAnualToMonthly(rate), months);

      const loan = {
        bankKey: bank.key,
        bank,
        amount: payment,
        time: months * 30,
      };

      loansArray.push(loan);
    });
    return loansArray;
  }

  @action setSavingKey(savingKey) {
    this.savingKey = savingKey;
  }

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
savingStore.savingKey;

export default savingStore;
