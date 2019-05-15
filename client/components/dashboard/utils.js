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

export const totalMonthly = data => {
  let returned = {};
  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    let trans = current.transactions;
    let filtered = trans.filter(elem => {
      if (elem.category.length === 2) {
        return (
          elem.category[0] !== 'Payment' && elem.category[1] !== 'Credit Card'
        );
      } else {
        return elem;
      }
    });
    for (let j = 0; j < filtered.length; j++) {
      let monthNum = filtered[j].date.slice(5, 7);
      let month = dict[monthNum];
      if (returned[month]) {
        returned[month] += filtered[j].amount;
      } else {
        returned[month] = filtered[j].amount;
      }
    }
  }
  return returned;
};

//this will give an object where the labels is an array of months
//and the total is an array of all the total per month
//the obj it takes in is the result of calling totalMonthly
export const condenseTotalMonthly = obj => {
  let newObj = {};
  let labels = Object.keys(obj);
  let total = Object.values(obj);
  newObj.labels = labels;
  newObj.total = total;
  return newObj;
};

//counter is basically getting the fullMonth until counter months before
export const getMonth = (transactions, counter) => {
  const d = new Date();
  let currentYear = d.getFullYear().toString();
  let monthNumber = Number(d.getMonth()) - counter;
  let monthNum = monthNumber.toString();
  if (monthNum.length === 1) {
    monthNum = '0' + monthNum;
  } else if (Number(monthNum) < 4) {
    monthNum = (Number(monthNum) + 12).toString();
  }
  const fullDate = currentYear + '-' + monthNum;
  return fullDate;
};

//this will give -- based on the month that is being passed on fullDate, will return an
//array of all the transaction objects in that month
export const getMonthsSpending = (transactions, counter) => {
  const fullDate = getMonth(transactions, counter);
  let newTrans = transactions.filter(transaction => {
    return (
      transaction.date.slice(0, 7) === fullDate &&
      !transaction.category.includes('Payment')
    );
  });
  return {
    date: fullDate,
    trans: newTrans,
  };
};

//this will push three objects of three different monthly transactions
export const simplifyMonthlyData = transactions => {
  let finalArray = [];
  let counter = -1;
  while (counter < 2) {
    const trans = getMonthsSpending(transactions, counter);
    finalArray.push(trans);
    counter += 1;
  }

  return finalArray;
};

// this is what we want to manipulate for the line graph which will give us an array
// of three different objects (since we're doing three different months)
//with their date in it as well
// NOTE: make sure to pass in transactions returned from simplifyMonthly!
export const finalLineGraphData = transactions => {
  let arr = simplifyMonthlyData(transactions);
  return arr.map(elem => {
    let ret = allCategorySpend(elem.trans);
    let returned = {};
    returned[elem.date] = ret;
    return returned;
  });
};
