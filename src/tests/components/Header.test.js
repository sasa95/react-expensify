import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';

test('should render header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogoutSpy = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogoutSpy} />);

  wrapper.find('button').simulate('click');
  expect(startLogoutSpy).toHaveBeenCalled();
});
