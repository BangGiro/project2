import './QnA.css';
import { useState , useEffect } from 'react';
import QnAdata from './components/QnAdata';
import CustomDropdown from './components/customDropdown';

const QnAPage = () => {
    // =================================================================================================

    
    // =================================================================================================
    // 데이터 불러오기 파트
    const userEmail = localStorage.getItem('memberLoggedInData');
    const categoryOptions = QnAdata.map((data) => data.category);
    const savedData = localStorage.getItem('personalQnA');
    const [dropDownData, setDropDownData] = useState({category:'' , details:''});
    let [details, setDetails] = useState(['상세 구분 선택']);



    useEffect(() => {
        if(userEmail) {
            document.getElementById('QnA_email').value = userEmail;
        }
    } , []);    
    
    function QnA_getCategory(selectedOption) {
        setDropDownData({...dropDownData , category: selectedOption});
    }

    function QnA_getDetails(selectedOption) {
        setDropDownData({...dropDownData , details: selectedOption});
    }

    // =================================================================================================
    // 데이터 저장 파트

    // 예외 처리
    const [personalQnA, setPersonalQnA] = useState(()=>{
        return savedData ? JSON.parse(savedData) : [];
    });


    // 제출 버튼 클릭 시 실행되는 함수
    const QnA_handleSubmit = (e) => {
        // e.preventDefault();

        // 값 받기
        const category = dropDownData; //드롭다운에서 받아온 값 0번째는 유형 1번째는 상세구분
        const title = document.getElementById('QnA_title').value;
        const content = document.getElementById('QnA_textarea').value;
        const email = document.getElementById('QnA_email').value;
        const userEmail = localStorage.getItem('memberLoggedInData');
        const date = new Date().toLocaleDateString();

        // Create a new QnA object
        const newQnA = {
            email,
            category, //0번째는 유형 1번째는 상세구분
            title,
            content,
            userEmail,
            date
        };

        // Update the state with the new QnA object
        setPersonalQnA([...personalQnA, newQnA]);


        // Clear the form fields
        document.getElementById('QnA_title').value = '';
        document.getElementById('QnA_textarea').value = '';
    };
    
    //로컬에 저장
    useEffect(() => {
                        if(personalQnA.length > 0) 
                        localStorage.setItem('personalQnA', JSON.stringify(personalQnA))
                    } 
                , [personalQnA] )
    

    //================================================================================================
    //인풋 제어 함수

        // 드롭다운 선택 시 상세 구분 변경
        useEffect(() => {
            // 카테고리가 선택되었는지 확인
            if(dropDownData.category) {
                // 선택된 카테고리에 해당하는 데이터 찾기
                const selectedCategoryData = QnAdata.find(data => data.category === dropDownData.category);
                // 상세 정보 설정
                if(selectedCategoryData) {
                    const updatedDetails = ['상세 구분 선택', ...selectedCategoryData.details];
                    setDetails(updatedDetails);
                }
            }
        }, [dropDownData.category, QnAdata]);

    
    //================================================================================================ 
    //유효성 검사 함수
    function CheckValues(e) {
        const categoryData = dropDownData;
        const email = document.getElementById('QnA_email').value;
        const title = document.getElementById('QnA_title').value;
        const content = document.getElementById('QnA_textarea').value;

        
        if(categoryData.category === '' || categoryData.details === '') {
            e.preventDefault();
            alert('문의 유형을 선택해주세요');
            return;
        }
        
        if(email === '' || title === '' || content === '') {
            e.preventDefault();
            alert('모든 항목을 입력해주세요');
            return;
        } else {
            QnA_handleSubmit();
        }
    }



    //================================================================================================
    //렌더링 파트


    return (        
        <div className="QnA_page">
            <h1>문의하기
                <img src="/image/unDrawSVG/undraw_personal_opinions.svg" alt="" />
            </h1>
            <form className='QnA_form'>
                <div className='QnA_inputs'>
                    <label className='QnA_label' htmlFor="QnA_name">이메일 주소</label>
                    <input type="text" id='QnA_email' placeholder='답장받을 이메일 입력' />

                    <label className='QnA_label' htmlFor="QnA_Category_select">문의 유형</label>
                    <CustomDropdown QnA_getValue={QnA_getCategory} QnAdata={categoryOptions}/>

                    <label className='QnA_label' htmlFor="QnA_Category_select_detail">상세 구분</label>
                    <CustomDropdown QnA_getValue={QnA_getDetails} QnAdata={details}/>

                    <label className='QnA_label' htmlFor="QnA_title">제목</label>
                    <input id='QnA_title' type="text" placeholder='40자 이내로 제목을 입력하세요' maxLength='40' />

                    <label htmlFor="QnA_textarea" className='QnA_label'>문의내용</label>
                    <textarea id='QnA_textarea' placeholder='문의할 내용을 자세히 적어주세요' maxLength='20000'></textarea>

                    <p className='QnA_file_custom_label'>파일첨부</p>
                    <label htmlFor="QnA_file" className='QnA_file_label'>파일 첨부</label>
                    <input type="file" id='QnA_file'/>

                </div>
                <button className='QnA_submitBtn' type="submit" onClick={CheckValues}>문의하기</button>
            </form>
        </div>
    )

};



export default QnAPage;
