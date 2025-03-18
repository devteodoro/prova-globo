import React from 'react';
import UserService from '../../Services/UserService';

const userService = new UserService()

const Users = async () => {

    const users = await userService.getUsers();

    return (
        <div>
          <h1>Lista de Usuários</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        </div>
      );
};
  
export default Users;
