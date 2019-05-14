export const simplifyMonthly = transactionProps => {
  let newArray = transactionProps.map(elem => {
    let name = elem.name;
    return elem.transactions.map(ele => {
      ele.accountName = elem.accountName;
      return ele;
    });
  });
  newArray = [].concat(...newArray);
  return newArray;
};

export const getIncomeTotal = incomeProps => {
  return incomeProps.reduce((accum, elem) => {
    return accum + elem.monthly_income;
  }, 0);
};
