//reformats this.props.transactions so that it is all transactions in a flat array across accounts. NOTE: account name is not included.
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
