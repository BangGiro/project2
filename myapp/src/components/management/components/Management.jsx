import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import './Management.css';

function Management({ loggedInEmail, onAddUser, onDeleteUser, onDeleteAllUsers }) {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='mainmanagement'>
      <div className="container">
        <input
          type="text"
          placeholder="사용자 이름 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="user-list">
          <UserList
            users={filteredUsers}
            onDeleteUser={handleDeleteUser}
            onEditUser={setUserToEdit}
            onOpenEditModal={() => setIsEditModalOpen(true)}
          />
        </div>
        <button onClick={() => setIsAddModalOpen(true)}>회원 추가</button>
        <button className="delete-all-button" onClick={onDeleteAllUsers}>전체 삭제</button>
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
