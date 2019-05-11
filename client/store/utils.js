export const simplifyMonthly = transactionProps => {
  console.log('the transaction props', transactionProps);
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

export const fetchBalanceSummary = balances => {
  return balances.map(elem => {
    elem.balance = elem.balance.filter(ele => {
      return ele.name === 'Plaid Checking' || ele.name === 'Plaid Saving';
    });
    return elem;
  });
};

//this uses fetchBalanceSummary to condense everything so make sure
//when we call this function we are sending in the ORIGINAL DATA FROM PLAID
export const balancesCondensed = arr => {
  const newArray = fetchBalanceSummary(arr);
  let result = [];
  for (let i = 0; i < newArray.length; i++) {
    let obj = {};
    obj.accountName = newArray[i].accountName;
    let balanceArray = newArray[i].balance;
    obj.Checking = balanceArray[0].balances.available;
    obj.Savings = balanceArray[1].balances.available;
    result.push(obj);
  }
  return result;
};
