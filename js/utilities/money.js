export default function toMoney(amount, type, convert) {
  let result = amount;
  switch (type) {
    case "PEN":
      return ("S/."+ result.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      break;
    case "DOL":
      return ("$"+ result.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      break;
  }
}
