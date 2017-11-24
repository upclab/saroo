export function frenchFee(principalAmount, rate, numberPayments) {
  return principalAmount * (
    (rate * ((1 + rate) ** numberPayments)) /
    (((1 + rate) ** numberPayments) - 1)
  );
}

export function effectiveAnualToMonthly(tea) {
  return ((1 + tea) ** (1 / 12)) - 1;
}
