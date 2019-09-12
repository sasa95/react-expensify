import React from 'react';
import { connect } from 'react-redux';
import totalExpenses from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount > 1 ? 'expenses' : 'expense';
  const formatedTotal = numeral(expensesTotal / 100).format('$0,0.00');

  return (
    <div>
      <h1>
        Viewing {expensesCount} {expenseWord} totaling {formatedTotal}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: expenses.length,
    expensesTotal: totalExpenses(state.expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
