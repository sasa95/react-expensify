import React from 'react';
import { LoginPage } from '../../components/LoginPage';
import { shallow } from 'enzyme';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);

  wrapper.find('button').simulate('click');
  expect(startLoginSpy).toHaveBeenCalled();
});
