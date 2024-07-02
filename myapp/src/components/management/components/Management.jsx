import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import './Management.css';

function Management({ loggedInEmail, onAddUser, onDeleteUser }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (loggedInEmail) {
      const storedUsers = JSON.parse(localStorage.getItem(`users_${loggedInEmail}`)) || [];
      setUsers(storedUsers);
    }
  }, [loggedInEmail]);

  const handleAddUser = (user, memo) => {
    onAddUser(user, memo);
    const updatedUsers = [...users, { ...user, memo }];
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (email) => {
    onDeleteUser(email);
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
  };

  return (
    <div className='mainmanagement'>
      <div className="container">
        <div className="user-list">
          <UserList users={users} onDeleteUser={handleDeleteUser} />
        </div>
        <button onClick={() => setIsModalOpen(true)}>회원 추가</button>
        {isModalOpen && (
          <AddUserModal
            onClose={() => setIsModalOpen(false)}
            onAddUser={handleAddUser}
            existingUsers={users}
          />
        )}
      </div>
    </div>
  );
}

export default Management;
