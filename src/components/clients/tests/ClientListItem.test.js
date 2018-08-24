import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ClientListItem } from '../ClientListItem';
import { clients } from '../../../utils/__mocks__/clients';

test('render client list component with data', () => {
  const wrapper = shallow(<ClientListItem {...clients[1]} />);
  expect(wrapper).toMatchSnapshot();
});
