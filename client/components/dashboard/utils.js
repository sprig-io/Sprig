import { simplifyMonthly } from '../../store/utils';

//reformats this.props.transactions to include transactions across accounts in a flat array. NOTE: account name is not included.

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
  return transactionProps.reduce(
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
  let labels = [];
  let spend = [];
  transactions.map(elem => {
    if (
      !labels.includes(elem.category[0]) &&
      !elem.category.includes('Payment') &&
      !elem.category.includes('Transfer')
    ) {
      labels.push(elem.category[0]);
      spend.push(getCategorySpend(transactions, elem.category[0]));
    }
  });
  return { labels, spend };
};

//this function uses the fetched data from the balances and filters it to show only
//Checking and Savings accounts only
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
  let newObj = {};
  transactionProps.map(elem => {
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

//call simplifiedMonthly first
const dict = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export const totalMonthly = transactions => {
  let data = simplifyMonthly(transactions);
  let returned = {};
  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    let trans = current.transactions;
    for (let j = 0; j < trans.length; j++) {
      let monthNum = trans[j].date.slice(5, 7);
      let month = dict[monthNum];
      console.log(month);
      if (returned[month]) {
        returned[month] += trans[j].amount;
      } else {
        returned[month] = trans[j].amount;
      }
    }
  }
  return returned;
};
