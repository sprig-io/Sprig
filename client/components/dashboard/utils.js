//reformats this.props.transactions to include transactions across accounts in a flat array. NOTE: account name is not included.
export const simplifyTransactions = transactionProps => {
  const newArray = transactionProps.map(elem => {
    return elem.transactions;
  });
  const simplified = [].concat(...newArray);
  return simplified;
};

// returns amount spent on a given category ACROSS accounts - takes this.props.transactions and a category string
export const getCategorySpend = (transactionProps, category) => {
  const simplified = simplifyTransactions(transactionProps);
  return simplified
    .filter(elem => {
      return elem.category.includes(category);
    })
    .reduce((accum, elem) => {
      return (accum += elem.amount);
    }, 0);
};

// returns the largest transaction in the last 30 days - does not include credit card payments or account transfers

export const getLargestTransaction = transactionProps => {
  let simplified = simplifyTransactions(transactionProps);
  return simplified.reduce(
    (accum, elem) => {
      if (
        accum.amount < elem.amount &&
        !elem.category.includes('Payment') &&
        !elem.category.includes('Transfer')
      ) {
        accum.amount = elem.amount;
        accum.merchant = elem.name;
        accum.date = new Date(elem.date);
      }
      return accum;
    },
    {
      amount: 0,
      merchant: '',
    }
  );
};
