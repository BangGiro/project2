import './DetailSc.css'

function DetailSc() {
    
    return (

        <div className="detailSc_container">

            <div className="dailySc">
                <h2>오늘의 일정</h2>
                <div className='dailySc_details'>
                    <p>시간</p>
                    <p>수업유형</p>
                    <p>회원이름</p>
                    <p>회원 전화번호</p>
                </div>
            </div>
            
            <div className="ScEdits">
                
                <button>일정 추가</button>
            </div>
            
        </div>

    )
} 

export default DetailSc;