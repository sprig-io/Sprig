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
  return transactionProps
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

// this returns an object of arrays with spending categories and corresponding ammounts spent
export const allCategorySpend = transactions => {
  let simplified = simplifyTransactions(transactions);
  let labels = [];
  let spend = [];
  simplified.map(elem => {
    if (
      !labels.includes(elem.category[0]) &&
      !elem.category.includes('Payment') &&
      !elem.category.includes('Transfer')
    ) {
      labels.push(elem.category[0]);
      spend.push(getCategorySpend(simplified, elem.category[0]));
    }
  });
  return { labels, spend };
};

//returns an object with merchant name and cumulative total spent at each merchant in last 30 days
export const merchantSpend = transactionProps => {
  let simplified = simplifyTransactions(transactionProps);
  let newObj = {};
  simplified.map(elem => {
    if (
      !elem.category.includes('Payment') &&
      !elem.category.includes('Transfer')
    ) {
      if (newObj[elem.name] === undefined) {
        newObj[elem.name] = elem.amount;
      } else {
        newObj[elem.name] += elem.amount;
      }
    }
  });

  return newObj;
};

//returns merchant with highest amount spent in the last 30 days cumulatively
export const largestByMerchant = transactionProps => {
  const newObj = merchantSpend(transactionProps);
  let largest = { name: '', amount: 0 };
  for (let key in newObj) {
    if (newObj[key] > largest.amount) {
      largest.name = key;
      largest.amount = newObj[key];
    }
  }
  return largest;
};
