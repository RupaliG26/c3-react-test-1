import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PearsonUsersName from '../PearsonUsersName';
import PearsonUsers from '../PearsonUsers';

describe("Individual PearsonUsers", () => {
  let user;
  const spyOnDelete = jest.fn();
     
  beforeEach(() => {
    user = shallow(<PearsonUsersName delUser={spyOnDelete} />);
  });
  
  it("render a list of users from the state, displaying first_name, last_name and the avatar", () => {
    expect(user).toBeTruthy();
  });
  
  it("calls _deleteUser when .delete-user is clicked", () => {
    user.find('.delete-user').simulate('click');
    expect(spyOnDelete).toHaveBeenCalled();
  });
});
