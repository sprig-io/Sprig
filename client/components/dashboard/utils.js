// returns amount spent on a given category ACROSS accounts - takes this.props.transactions and a category string

export function getCategorySpend(transactionProps, category) {
  let newArray = transactionProps.map(elem => {
    return elem.transactions;
  });

  newArray = [].concat(...newArray);

  return newArray
    .filter(elem => {
      return elem.category.includes(category);
    })
    .reduce((accum, elem) => {
      return (accum += elem.amount);
    }, 0);
}
