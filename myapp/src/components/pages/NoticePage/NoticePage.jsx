import React, { useEffect, useState,useRef } from 'react';
import notices from './components/notices';
import './noticePage.css';
import NoticeView from './components/NoticeView';
import SearchBar from './components/SearchBar';

const NoticePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [noticesPerPage] = useState(10); // Number of notices to display per page

    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    let currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

    // =================================================================================================    
    // 페이지네이션
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //=================================================================================================
    // 이벤트 핸들러 
    const [noticeID, setNoticeID] = useState('');
    const [category, setCategory] = useState('전체');

    
    // 공지사항 클릭 시 해당 공지사항의 ID를 NoticeView로 전달
    const sendData = (e) => {
        let closest = e.target.closest('.notice_item');
        if (closest) {
            setNoticeID(closest.getAttribute('data-notice-id'));
        } 
        window.scrollTo(0,0);
    }

    //탭 클릭시 카테고리 변경
    // let previousCategory = true;
    const previousCategory = useRef(null);

    
    function tabs(e) {
        let clickedBtn = e.target.closest('button');

        setCategory(e.target.innerText);
        setSearchText('');

        if(!clickedBtn.classList.contains('noticeActive')) {
            clickedBtn.classList.add('noticeActive');   
        } 
        if(previousCategory.current && previousCategory.current !== e.target) {
            previousCategory.current.classList.remove('noticeActive');
        }
        
        previousCategory.current = clickedBtn;  
    }

    //=================================================================================================
    // 탭 + 검색 필터링 기능
    
    const [currentList, setCurrentList] = useState(notices);
    const [searchText, setSearchText] = useState(''); // 검색어

    useEffect(() => {
        if (category === '전체') {
            setCurrentList(notices);
        } else {
            setCurrentList(notices.filter(notice => notice.category === category));
        }
        setCurrentPage(1); // 카테고리가 변경될 때마다 첫 페이지로 리셋
    }, [category]);

    function NoticeList() {
        let CheckedCurrentNotices = currentList.filter(notice => notice.title.includes(searchText));

        if(CheckedCurrentNotices.length > 0) {
            if (category === '전체') {
                    return currentNotices.filter(notice => notice.title.includes(searchText)).map((notice) => (
                        <div key={notice.id} data-notice-id={notice.id} className="notice_item" onClick={sendData}>
                            <span>{notice.category}</span>
                            <h3>{notice.title}</h3>
                            <span>{notice.date}</span>
                        </div>
            ))} else {
                currentNotices = notices.filter(notice => notice.category === category ).slice(indexOfFirstNotice, indexOfLastNotice);
                
                return currentNotices.filter(notice => notice.title.includes(searchText)).map((notice) => (
                    <div key={notice.id} data-notice-id={notice.id} className="notice_item" onClick={sendData}>
                        <span>{notice.category}</span>
                        <h3>{notice.title}</h3>
                        <span>{notice.date}</span>
                    </div>
            ))}

        } else {
            return <div>검색 결과가 없습니다.</div>
        }
    }

    //=================================================================================================
    // 검색 기능 데이터 받기

    function detectSearch(searchText) {
            
        if(searchText !== null) {
            setSearchText(searchText);
        } else {
            setSearchText('');
        }
    }

    //=================================================================================================
    // 렌더링 파트 


    return (
        <div className="notice_page">
            <h1>공지사항</h1>
            {/* 공지 뷰어 */}
            <NoticeView noticeID={noticeID}/>
            {/* 카테고리 탭 */}
            <div className="notice_tabs" onClick={tabs}>
                <button className="notice_tab">전체</button>
                <button className="notice_tab">업데이트</button>
                <button className="notice_tab">점검</button>
                <button className="notice_tab">이벤트</button>
                <button className="notice_tab">일반</button>
            </div>
            {/* 리스트 */}
            <NoticeList/>
            {/* 검색 */}
            <SearchBar detectSearch={detectSearch} upDate={category}/>    
            {/* 페이지 네이션 */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(currentList.length / noticesPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NoticePage;
