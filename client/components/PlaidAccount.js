import React, { Component } from 'react';
import { addingAccount } from '../store/accountReducer';
import { connect } from 'react-redux';
import PlaidLinkButton from 'react-plaid-link-button';

const rules = {
  color: 'blue',
  size: '30px',
};

class PlaidAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };

    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  handleOnSuccess(token, metadata) {
    const { accounts } = this.props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts,
    };
    this.props.addingAccount(plaidData);
  }

  render() {
    return (
      <div id="plaid-button" className="boxes">
        <PlaidLinkButton
          buttonProps={{
            className:
              'btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn',
          }}
          plaidLinkProps={{
            clientName: 'Sprig',
            key: '371579f573cc098b5fbbee72dcc928',
            env: 'sandbox',
            product: ['transactions'],
            onSuccess: this.handleOnSuccess,
          }}
          onScriptLoad={() => this.setState({ loaded: true })}
          id="plaid-button"
        >
          Add Accounts
        </PlaidLinkButton>
        <p className="description">Powered by Plaid</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  addingAccount: plaidData => dispatch(addingAccount(plaidData)),
});

const ConnectedPlaidAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaidAccount);

export default ConnectedPlaidAccount;
