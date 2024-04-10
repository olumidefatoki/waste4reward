export const toMoney = (
  num,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
) => {
  return new Intl.NumberFormat("en-US", options).format(num);
};
