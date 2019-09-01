import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import { shallow } from 'enzyme';

test('should render ExpenseListItem with data', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
