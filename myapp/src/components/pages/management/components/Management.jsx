// Management 컴포넌트
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import './Management.css';

function Management({ onAddUser, selectUser , users: initialUsers, isSc }) {
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setUsers(initialUsers || []);
  }, [initialUsers]);

  const handleAddUser = (user) => {
    onAddUser(user);
    const updatedUsers = [...users, { ...user }];
    setUsers(updatedUsers);
    };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='mainmanagement'>
      <div className="container">
        <h1>내 회원 목록</h1>
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
            onEditUser={setUserToEdit}
            onOpenEditModal={() => setIsEditModalOpen(true)}
            isSc={isSc}
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
      </div>
    </div>
  );
}

export default Management;