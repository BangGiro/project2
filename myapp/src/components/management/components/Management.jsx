import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal'; // 수정 모달 추가
import './Management.css';

function Management({ loggedInEmail, onAddUser, onDeleteUser }) {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

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

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem(`users_${loggedInEmail}`, JSON.stringify(updatedUsers));
    setIsEditModalOpen(false);
  };

  return (
    <div className='mainmanagement'>
      <div className="container">
        <div className="user-list">
          <UserList
            users={users}
            onDeleteUser={handleDeleteUser}
            onEditUser={setUserToEdit}
            onOpenEditModal={() => setIsEditModalOpen(true)}
          />
        </div>
        <button onClick={() => setIsAddModalOpen(true)}>회원 추가</button>
        {isAddModalOpen && (
          <AddUserModal
            onClose={() => setIsAddModalOpen(false)}
            onAddUser={handleAddUser}
            existingUsers={users}
          />
        )}
        {isEditModalOpen && userToEdit && (
          <EditUserModal
            onClose={() => setIsEditModalOpen(false)}
            onEditUser={handleEditUser}
            user={userToEdit}
          />
        )}
      </div>
    </div>
  );
}

export default Management;
