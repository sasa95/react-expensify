import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={1} expensesTotal={40} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={12} expensesTotal={123500} />
  );
  expect(wrapper).toMatchSnapshot();
});
