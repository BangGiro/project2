import React, { useState , useEffect, useMemo, useRef } from 'react';


const CustomDropdown = ({QnA_getValue , QnAdata }) => {
    const options = QnAdata; // 드롭다운 옵션 예시
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const DropdownContainer = useRef(null);
    let [hidden ,setHidden] = useState(true);

    
    //input 값 받아오기
    const handleSelect = (event) => {
        setSelectedOption(event.target.innerText);
        showOptions(event);
    };

    //이전 요소 미선택시 disabled
    useEffect(() => {
        // selectedOption 값에 따라 클래스를 조건부로 추가하거나 제거
        if (options.length < 2) {
            DropdownContainer.current.classList.add('disabled');
        } else {
            DropdownContainer.current.classList.remove('disabled');
        }
    }, [selectedOption, options]);

    



    // 부모 컴포넌트로 값 전달
    useEffect( ()=> QnA_getValue(selectedOption) , [selectedOption] );

    


    // 리스트 여닫기
    const showOptions = (event) => {
        const CustomDropdown = event.target.closest('.CustomDropdown');
        const DropdownOptionsArea = CustomDropdown.querySelector('.DropdownOptionsArea');
        const CustomDropDownArrows = CustomDropdown.querySelector('.CustomDropdownArrows');
    
        if (hidden) {
            CustomDropDownArrows.style.transform = 'rotate(180deg)';
            DropdownOptionsArea.style.display = 'block';
        } else {
            CustomDropDownArrows.style.transform = 'rotate(0deg)'
            DropdownOptionsArea.style.display = 'none';
        } 
    
        setHidden(!hidden);
    }

    return (
        <>
            <style>
                {`
                .CustomDropdown {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    
                    position: relative;
                    width: 100%;
                    background: white;
                    border: 1px solid rgb(0, 0, 0, 0.5);;
                    border-radius: 4px;
                }
                .selectViewElement {
                    padding: .4rem;
                    cursor: pointer;
                    position: relative;
                }
                .DropdownOptionsArea {
                    display: none;
                    height: auto;
                    width: 100%;

                    margin-top: 1px;
                    position: absolute;
                    
                    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
                }
                .CustomDropdownOptions {
                    padding: 10px;
                    cursor: pointer;
                    background-color: white;
                    width: 100%;
                }                    
                .CustomDropdownOptions:hover {
                    background-color: rgb(200, 200, 200);
                }
                .CustomDropdownArrows {
                    position: absolute;
                    
                    background-image: url('https://cdn-icons-png.flaticon.com/128/9931/9931001.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;

                    height: 1rem;
                    width: 1rem;

                    right: 10px;
                    top: calc((100% - 1rem) / 2);
                    
                    transition: transform 0.3s;
                }    
                .className='ShowCustomDropdownOptions'{
                    display: block;
                } 
                `}
            </style>

            <ul className='CustomDropdown' value={selectedOption} ref={DropdownContainer}>
                <li onClick={showOptions} className='selectViewElement'>
                    <p>{ 
                    options.includes(selectedOption) ?
                    selectedOption : options[0]            
                    }</p>                  
                    <span className='CustomDropdownArrows'></span>
                </li>

                <ul className='DropdownOptionsArea'>
                    {options.filter((option, index)=> index > 0 ).map((option, index) => (
                        <li className='CustomDropdownOptions' 
                        key={index}
                        onClick={handleSelect}>
                            {option}
                        </li>
                    ))}
                </ul>

            </ul>
        </>
    );
};

export default CustomDropdown;