import React, { useState, useEffect } from 'react';
import Schedule from './components/Schedule'; // Schedule 컴포넌트 추가
import MemberManagement from './components/MemberManagement'; // MemberManagement 컴포넌트 추가
import Category from './components/Category'; // Category 컴포넌트 추가
import './components/AddMemberModal.css';  // AddMemberModal.css 추가
import './Main.css';

const ManagementMain = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [view, setView] = useState('members'); // 'members' or 'schedule'

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('members')) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    if (items.length > 0)
      localStorage.setItem('members', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    if (items.length < 50) {
      setItems([...items, item]);
    } else {
      alert("Maximum 50 items allowed.");
    }
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    setCurrentIndex(index);
  };

  const saveItem = (index, item) => {
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const viewItem = (index) => {
    setCurrentIndex(index);
  };

  const selectCategory = (index) => {
    if (index === 'schedule') {
      setView('schedule');
    } else {
      setCurrentIndex(index);
      setView('members');
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <Category items={items} onSelect={selectCategory} />
      </div>
      <div className="main-content">
        {view === 'members' ? (
          <MemberManagement
            items={items}
            addItem={addItem}
            deleteItem={deleteItem}
            editItem={editItem}
            saveItem={saveItem}
            viewItem={viewItem}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <Schedule items={items} />
        )}
      </div>
    </div>
  );
};

export default ManagementMain;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ManagementMain() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const parsedIsLoginTrue = parsedCompareLocalLoginData.isLoginTrue;
//   const CompareLocalLoginData = localStorage.getItem("userData");
//   const parsedCompareLocalLoginData = JSON.parse(CompareLocalLoginData);
//   const parsedEmail = parsedCompareLocalLoginData.email;
  
  
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };
//   useEffect(()=> parsedIsLoginTrue && loginType === "트레이너" ? true : alert("일반 사용자는 접근할 수 없습니다."), []);
  
//   function CompareLoginData(e) {
//     e.preventDefault();
//       if(email === parsedEmail && loginType === "일반") {
//         navigate("/exerciseMain");
        
//       } else {
      
//       }
// }

//   return (
//     <div>

//     </div>
//   );
// }