const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  monthlyGoal: {
    type: String,
    required: true,
  },
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);
