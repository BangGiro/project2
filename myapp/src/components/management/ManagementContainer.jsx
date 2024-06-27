import React from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import './ManagementContainer.css';

function ManagementContainer({ loggedInEmail }) {
    return (
        <div className="management-container">
            <div className='manacategory'>
                <CategoryContainer />
            </div>
            <div className='maco'>
                <Management loggedInEmail={loggedInEmail} />
            </div>
        </div>
    );
}

export default ManagementContainer;
