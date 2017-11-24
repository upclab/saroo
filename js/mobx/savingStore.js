import { action, computed, observable } from 'mobx';

import { savingsRef } from '@/firebaseApp';
import GroupStore from '@mobx/groupStore';
import BankStore from '@mobx/bankStore';

import { MONTHS_FOR_LOANS, RATES_ANUAL } from '@lib/params';
import { frenchFee, effectiveAnualToMonthly } from '@lib/rates';

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

  @computed get loans() {
    if (!this.savingKey) {
      return [];
    }

    const loansArray = [];
    const saving = this.getSaving(this.savingKey);
    const amount = saving.meta - saving.current;

    const { banks } = BankStore;

    banks.forEach((bank) => {
      const months = MONTHS_FOR_LOANS[Math.floor(Math.random() * MONTHS_FOR_LOANS.size) + 1];
      const rate = RATES_ANUAL[Math.floor(Math.random() * RATES_ANUAL.size) + 1];
      const payment = frenchFee(amount, effectiveAnualToMonthly(rate), months);

      const loan = {
        bank,
        amount: payment,
        time: months * 30,
      };

      loansArray.push(loan);
    });
    return loansArray;
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
savingStore.banks;

export default savingStore;
