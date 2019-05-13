import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cards from './cards';

class InsightCard extends Component {
  render() {
    const tutorialSteps = [
      {
        label: `You've spent $${Math.round(this.props.transpoSpend * 100) /
          100} on Travel.`,
        imgPath:
          'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: `You've spent a total of $${Math.round(
          this.props.merchantSpend.amount * 100
        ) / 100} at ${this.props.merchantSpend.name}.`,
        imgPath:
          'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: `Your largest transaction was for $${Math.round(
          this.props.largest.amount * 100
        ) / 100} at ${this.props.largest.merchant}.`,
        imgPath:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: `You've spent $${Math.round(this.props.restaurantSpend * 100) /
          100} at Restaurants and Bars.`,
        imgPath:
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      },

      {
        label: `You have paid $${Math.round(this.props.fees * 100) /
          100} in banking and ATM fees.`,
        imgPath:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      },
    ];

    return (
      <div>
        <Cards tutorialSteps={tutorialSteps} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.accountReducer.transactions,
  largest: state.insightReducer.largest,
  restaurantSpend: state.insightReducer.restaurantSpend,
  merchantSpend: state.insightReducer.merchantSpend,
  transpoSpend: state.insightReducer.transpoSpend,
  fees: state.insightReducer.fees,
});

export default connect(mapStateToProps)(InsightCard);
