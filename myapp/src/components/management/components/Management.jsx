// import React, { useState, useEffect } from 'react';
// import UserList from './UserList';
// import AddUserModal from './AddUserModal';
// import './Management.css';

// function Management() {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
//     setUsers(storedMemos);
//   }, []);

//   const handleAddUser = (user, memo) => {
//     const newUser = { ...user, memo };
//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers);
//     localStorage.setItem('memos', JSON.stringify(updatedUsers));
//   };

//   return (
//     <div className='mainmanagement'>
//       <button onClick={() => setIsModalOpen(true)}>회원 추가</button>
//       <UserList users={users} />
//       {isModalOpen && (
//         <AddUserModal
//           onClose={() => setIsModalOpen(false)}
//           onAddUser={handleAddUser}
//         />
//       )}
//     </div>
//   );
// }

// export default Management;

import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import './Management.css';

function Management({ loggedInEmail }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
    setUsers(storedMemos);
  }, []);

  const handleAddUser = (user, memo) => {
    const newUser = { ...user, memo, trainer: loggedInEmail };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('memos', JSON.stringify(updatedUsers));
  };

  return (
    <div className='mainmanagement'>
      <div className="container">
        <button onClick={() => setIsModalOpen(true)}>회원 추가</button>
        <div className="user-list">
          <UserList users={users} />
        </div>
        {isModalOpen && (
          <AddUserModal
            onClose={() => setIsModalOpen(false)}
            onAddUser={handleAddUser}
          />
        )}
      </div>
    </div>
  );
}

export default Management;
