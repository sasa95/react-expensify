import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test('should correctly add up single expense', () => {
  const total = selectExpensesTotal([expenses[0]]);
  expect(total).toBe(195);
});

test('should correctly added up multiple expenses', () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(114195);
});
