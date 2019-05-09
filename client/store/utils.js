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
