// import React, { useState, useEffect } from 'react';
// import UserList from './UserList';
// import AddUserModal from './AddUserModal';
// import './Management.css';

// function Management({ loggedInEmail }) {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
//     const filteredMemos = storedMemos.filter(memo => memo.trainer === loggedInEmail);
//     setUsers(filteredMemos);
//   }, [loggedInEmail]);

//   const handleAddUser = (user, memo) => {
//     const newUser = { ...user, memo, trainer: loggedInEmail };
//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers);
//     localStorage.setItem('memos', JSON.stringify(updatedUsers));
//   };

//   return (
//     <div className='mainmanagement'>
//       <div className="container">
//         <div className="user-list">
//           <UserList users={users} />
//         </div>
//         <button onClick={() => setIsModalOpen(true)}>회원 추가</button>
//         {isModalOpen && (
//           <AddUserModal
//             onClose={() => setIsModalOpen(false)}
//             onAddUser={handleAddUser}
//             existingUsers={users} // 기존 회원 목록 전달
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Management;

import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import './Management.css';

function Management({ loggedInEmail, onAddUser }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
    const filteredMemos = storedMemos.filter(memo => memo.trainer === loggedInEmail);
    setUsers(filteredMemos);
  }, [loggedInEmail]);

  const handleAddUser = (user, memo) => {
    onAddUser(user, memo);
    const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
    const filteredMemos = storedMemos.filter(memo => memo.trainer === loggedInEmail);
    setUsers(filteredMemos);
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
