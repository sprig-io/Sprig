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
      return elem.category[0] === category;
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

export const subscriptionFinder = transactions => {
  const shortList = {};

  for (let i = 0; i < transactions.length; i++) {
    let current = transactions[i];
    if (!shortList[current.name]) {
      shortList[current.name] = {
        num: 1,
        charge: current.amount,
        date: current.date.slice(8),
        accountName: current.accountName,
      };
    } else {
      if (
        shortList[current.name].charge === current.amount &&
        shortList[current.name].date === current.date.slice(8) &&
        shortList[current.name].accountName === current.accountName
      ) {
        shortList[current.name].num++;
      }
    }
  }
  let finalList = [];
  for (let key in shortList) {
    if (shortList[key].num === 3) {
      finalList.push({
        name: shortList[key].name,
        amount: shortList[key].amount,
      });
    }
  }
  return finalList;
};
