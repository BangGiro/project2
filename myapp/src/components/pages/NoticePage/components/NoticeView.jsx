import { useEffect, useState } from "react";
import notices from "./notices";


const NoticeView = ({noticeID , isMini , setNoticeID}) => {
    const [currentNotice, setCurrentNotice] = useState(null);
    useEffect(() => {
        setCurrentNotice(notices.find(notice => notice.id === +noticeID));
    }, [noticeID]); // noticeID가 변경될 때만 실행

    if (currentNotice) {
        if(isMini) {
            return (
                <div className="NoticeView Mini">
                    <header>
                        <span className="NoticeViewCategory">{currentNotice.category}</span>
                        <h1 className="noticeViewTitle">{currentNotice.title}</h1>
                        <span className="NoticeViewExit" onClick={()=> setNoticeID(null)}>닫기</span>
                    </header>
                    <p className="noticeViewDate">작성일 {currentNotice.date}</p>
                    <p className="noticeViewContent">{currentNotice.content}</p>
                </div>
            )    
        } else {
            return (
                <div className="NoticeView">
                    <header>
                        <span className="NoticeViewCategory">{currentNotice.category}</span>
                        <h1 className="noticeViewTitle">{currentNotice.title}</h1>
                        <span className="NoticeViewExit" onClick={()=> setNoticeID(null)}>닫기</span>
                    </header>
                    <p className="noticeViewDate">작성일 {currentNotice.date}</p>
                    <p className="noticeViewContent">{currentNotice.content}</p>
                </div>
            );
        }

        
    } else {
        return <></>
    }
}

export default NoticeView;
