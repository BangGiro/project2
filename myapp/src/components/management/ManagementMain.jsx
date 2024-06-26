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