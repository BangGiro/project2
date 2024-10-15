import React, { useEffect, useState , createContext } from 'react';
import Management from './components/Management';
import UserDetail from './components/UserDetail';
import { getLoggedInUser } from '../helpers/auth'; // isLoggedIn 삭제
import './ManagementContainer.css';
import { apiCall } from '../../../service/apiService';
import ScheduleCalender from '../scheduleManagement/Schedules';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);
    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState(null);
    const user = localStorage.getItem("JwtToken");

    useEffect(() => {
        
        if (user) {

            const uri = "/users/finduserlist";
            const method = "post";
            const data = { trainerId : localStorage.getItem('memberLoggedInData') };
            const token = localStorage.getItem("JwtToken");

            apiCall(uri, method, data, token)
            .then((Response) =>{
                
                if(Response != null) {
                    setUsers(Response);

                } else {
                    setUsers([]);
                    alert("회원이 없습니다");
                }

            }).catch((err)=>{
                alert("권한이 없습니다");
            })

        }
    }, []); // Optional chaining 사용


    //유저리스트 관리
    const handleAddUser = (newUser, memo) => {
        const updatedUser = { ...newUser, memo, trainer: user.email };
        const updatedUsers = [...users, updatedUser];
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name, phoneNumber: user.phoneNumber })));
    };

    const handleDeleteMember = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name })));
        localStorage.setItem(`users_${user.email}`, JSON.stringify(updatedUsers));
    };


    return (
        <UserContext.Provider value={{ setUserDetail }}>
        
            <div className="management-container">
                <section className='sc1'>
                    <Management
                        onAddUser={handleAddUser}
                        onDeleteUser={handleDeleteMember}
                        users={users}
                        />
                </section>
                <section className='sc2'>
                    <UserDetail 
                    selectUser={userDetail}
                    />
                </section>
                <section className='sc3'>
                    {/* <ScheduleCalender/> */}
                </section>
            </div>

        </UserContext.Provider>

    );
}

export default ManagementContainer;
