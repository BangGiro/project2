import React, { useState } from 'react';
import Member from './Member';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import ViewMemberModal from './ViewMemberModal';

const MemberManagement = ({ items, addItem, deleteItem, editItem, saveItem, viewItem, currentIndex, setCurrentIndex }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    return (
        <>
        <h1>회원 관리</h1>
            {isModalOpen && (
                <AddMemberModal
                    onAdd={(item) => {
                        addItem(item);
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditMemberModal
                    item={items[currentIndex]}
                    onSave={(item) => {
                        saveItem(currentIndex, item);
                        setIsEditModalOpen(false);
                    }}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
            {isViewModalOpen && (
                <ViewMemberModal
                    item={items[currentIndex]}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}
            <Member items={items} onDelete={deleteItem} onEdit={(index) => { setCurrentIndex(index); setIsEditModalOpen(true); }} onView={(index) => { setCurrentIndex(index); setIsViewModalOpen(true); }} />
            <button className="add-member-button" onClick={() => setIsModalOpen(true)}>
                회원 추가
            </button>
        </>
    );
};

export default MemberManagement;
