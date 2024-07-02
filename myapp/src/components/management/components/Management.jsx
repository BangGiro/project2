import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import './Management.css';

function Management({ loggedInEmail, onAddUser }) {
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
  };

  return (
    <div className='mainmanagement'>
      <div className="container">
        <div className="user-list">
          <UserList users={users} />
        </div>
        <button onClick={() => setIsModalOpen(true)}>회원 추가</button>
        {isModalOpen && (
          <AddUserModal
            onClose={() => setIsModalOpen(false)}
            onAddUser={handleAddUser}
            existingUsers={users} // 기존 회원 목록 전달
          />
        )}
      </div>
    </div>
  );
}

export default Management;
