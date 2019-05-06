const express = require('express');
const plaid = require('plaid');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const moment = require('moment');
const mongoose = require('mongoose');
const {
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
} = require('../secret');

// Load Account and User models
const Account = require('../../models/Account');
const User = require('../../models/User');

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: '2018-05-22' }
);

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private

router.get(
  '/accounts',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const accounts = await Account.find({ userId: req.user.id });
      return res.json(accounts);
    } catch (err) {
      next(err);
    }
  }
);

// @route POST api/plaid/accounts/add
// @desc Trades public token for access token and stores credentials in database
// @access Private

// router.post(
//   '/accounts/add',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     PUBLIC_TOKEN = req.body.public_token;
//     const userId = req.user.id;
//
//     const institution = req.body.metadata.institution;
//     const { name, institution_id } = institution;
//
//     if (PUBLIC_TOKEN) {
//       client
//         .exchangePublicToken(PUBLIC_TOKEN)
//         .then(exchangeResponse => {
//           ACCESS_TOKEN = exchangeResponse.access_token;
//           ITEM_ID = exchangeResponse.item_id;
//
//           // Check if account already exists for specific user
//           Account.findOne({
//             userId: req.user.id,
//             institutionId: institution_id,
//           })
//             .then(account => {
//               if (account) {
//                 console.log('Account already exists');
//               } else {
//                 const newAccount = new Account({
//                   userId: userId,
//                   accessToken: ACCESS_TOKEN,
//                   itemId: ITEM_ID,
//                   institutionId: institution_id,
//                   institutionName: name,
//                 });
//
//                 newAccount.save().then(account => res.json(account));
//               }
//             })
//             .catch(err => console.log(err)); // Mongo Error
//         })
//         .catch(err => console.log(err)); // Plaid Error
//     }
//   }
// );

router.post(
  '/accounts/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    PUBLIC_TOKEN = req.body.public_token;
    const userId = req.user.id;
    const institution = req.body.metadata.institution;
    const { name, institution_id } = institution;
    if (PUBLIC_TOKEN) {
      const exchangeResponse = await client.exchangePublicToken(PUBLIC_TOKEN);
      ACCESS_TOKEN = exchangeResponse.access_token;
      ITEM_ID = exchangeResponse.item_id;
      const account = await Account.findOne({
        userId: req.user.id,
        institutionId: institution_id,
      });
      if (account) {
        return res.send('Account already exists');
      } else {
        const newAccount = new Account({
          userId: userId,
          accessToken: ACCESS_TOKEN,
          itemId: ITEM_ID,
          institutionId: institution_id,
          institutionName: name,
        });
        await newAccount.save();
        return res.json(newAccount);
      }
    }
  }
);
// @route DELETE api/plaid/accounts/:id
// @desc Del ete account with given id
// @access Private

router.delete(
  '/accounts/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const account = await Account.findById(req.params.id);
      await account.remove();
      return res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post(
  '/accounts/transactions',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

    let transactions = [];

    const accounts = req.body;

    if (accounts) {
      accounts.forEach(function(account) {
        ACCESS_TOKEN = account.accessToken;
        const institutionName = account.institutionName;

        client
          .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
          .then(response => {
            transactions.push({
              accountName: institutionName,
              transactions: response.transactions,
            });

            if (transactions.length === accounts.length) {
              res.json(transactions);
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
);

/*  router.post('/accounts/transactions',passport.authenticate("jwt", { session: false }),async (req,res,next)=>{
  try{
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
    let transactions = [];
    const accounts = req.body;
    if (accounts) {
      accounts.forEach(function(account) {
      ACCESS_TOKEN = account.accessToken;
      const institutionName = account.institutionName;
      const trans = await client.getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
      transactions.push(
        {accountName: institutionName,
        transactions: trans.transactions
      })
        if (transactions.length === accounts.length){
          return  res.json(transactions);
        }
      }
    }
  }
catch(err){
  next(err)
}
}); */

module.exports = router;
