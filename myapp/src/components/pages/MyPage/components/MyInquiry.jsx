import { useEffect, useState } from "react";

export default function MyInquiry() {

//=================================================================================================
// 데이터 불러오기 파트
    const [inquiryList, setInquiryList] = useState([]);
    
    useEffect(() => {
        let inquiryData = localStorage.getItem('personalQnA');
        if(inquiryData) {
            setInquiryList(JSON.parse(inquiryData));
        }
    }, []);
    
//=================================================================================================
// 데이터 매핑 

    function inquiryMapping() {
        if(inquiryList.length > 0) {
            return inquiryList.map((inquiry, index) => {
                return (
                    <div key={index} className="Inquiry">
                            <span>{index + 1}</span>

                            <p>{inquiry.category.category}</p>

                            <p>{inquiry.title}</p>

                            <p>{inquiry.date}</p>
                    </div>
                );
            })
        } else {
            return <div className="noInquiry">문의 내역이 없습니다.</div>
        }
    }

//=================================================================================================
// 렌더링 파트
    
    return (
        <section className="MyInquiry"> 
            <h1>문의 내역</h1>

            <div className="InquiryBox">
                <div className="InquiryTable">
                    <span>번호</span>
                    <span>분류</span>
                    <span>문의 제목</span>
                    <span>작성일</span>
                </div>
                { inquiryMapping() }
            </div>

        </section>
    )
}