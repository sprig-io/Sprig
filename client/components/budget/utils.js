export const getMonthsSpending = transactions => {
  const d = new Date();
  let currentYear = d.getFullYear().toString();
  let monthNum = d.getMonth().toString();
  if (monthNum.length === 1) {
    monthNum = '0' + monthNum;
  }
  const fullDate = currentYear + '-' + monthNum;

  return transactions
    .filter(transaction => {
      return (
        transaction.date.slice(0, 7) === fullDate &&
        !transaction.category.includes('Payment') &&
        !transaction.category.includes('Transfer')
      );
    })
    .reduce((accum, elem) => {
      return accum + elem.amount;
    }, 0);
};

export const getSpendLimit = (income, savingsGoal) => {
  return Number(income) - Number(savingsGoal);
};
