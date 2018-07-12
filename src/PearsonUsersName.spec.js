import React from 'react';
import { shallow } from 'enzyme';
import PearsonUsersName from './PearsonUsersName';
import PearsonUsers from './PearsonUsers';

describe("Individual PearsonUsers", () => {
  let component;
  const spyOnDelete = jest.fn();
     
  beforeEach(() => {
    component = shallow(<PearsonUsersName delUser={spyOnDelete} />);
  });
  
  it("calls _deleteUser when .delete-user is clicked", () => {
    component.find('.delete-user').simulate('click');
    expect(spyOnDelete).toHaveBeenCalled();
  });
});
