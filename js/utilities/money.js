export default function toMoney(amount, type) {
  const result = Number(amount);
  switch (type) {
    case 'PEN':
      return (`S/.${result.toFixed(2)}`).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    case 'DOL':
      return (`$${result.toFixed(2)}`).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    default:
      return amount;
  }
}
