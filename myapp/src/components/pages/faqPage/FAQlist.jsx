
//========================================================
import FAQ from './FAQ.jsx'
import { useCallback, useEffect, useMemo, useState } from 'react';
import FAQdata from './FAQdata.jsx';
import FAQsearch from './FAQsearch.jsx';



//==============================================================================

export default function FAQlist({isMini}){

//==============================================================================
//카테고리별 출력 제어함수(카테고리 선택박스)

    let [category, setCategory ] = useState('all');


    function categoryOut(e) {
        setCategory(e.target.value);
        console.log(category);
    }

//==============================================================================    
//리스트 추가 출력 제어함수(더보기 버튼)

const [ItemLength ,  setItemLength] = useState(5);

//카테고리 변경시 리스트 초기화
useMemo(()=> setItemLength(5), [ category ])

    //더보기 버튼 FAQ 5개 단위 출력
    function AddList() {
    
        function addItem() {
            setItemLength(ItemLength + 5);
        }

        if(FAQfilterOBJ().map(mapItem).length > ItemLength ){
            return <div className='FAQaddList' onClick={addItem}> + 더보기 </div>
        } else {
            return null;
        }

    };

//=============================================================================
//렌더링 파트

    //====================================================================
    //FAQ리스트 맵핑 함수
    function mapItem(item , i) {

        if (i < ItemLength) {
            return <FAQ 
                        key={item.id}
                        title={item.title} 
                        category={item.category} 
                        solution={item.solution} 
                        openList={openList}/>
        } return null;

    };

    //카테고리 선택여부 판단
    function FAQfiltering(item) {
        if (category === 'all') {
            return true;
        }
            return item.category === category;
    }


    //====================================================================
    //세션 스토리지에서 값 받기
    const [searchFilter , setSearchFilter ]  = useState('');

    let FAQparsedValue = null;

    function detectSearch() {
        FAQparsedValue = sessionStorage.getItem('searchedValue'); 
        FAQparsedValue = JSON.parse( FAQparsedValue ); 
        setSearchFilter( FAQparsedValue );
    } 

    function FAQfilteringSearch(item) {
        return item.title.includes(searchFilter); 
    }
    
    function FAQfilterOBJ() {
        if(searchFilter === null || searchFilter === undefined) {
            return FAQdata.filter(FAQfiltering);
        } else {
            return FAQdata.filter(FAQfiltering).filter(FAQfilteringSearch);
        }
    }
        
    //==================================================================================
    //FAQ리스트 출력

    const FAQNothingOnSearch = () => {
        return <p className='NothingOnSearch'>검색결과가 없습니다.</p>
    }

    if(isMini) {
        return (
            <div className='Mini_FAQlist' >
                { FAQfilterOBJ().map((item , index)=>{
                    if(index < 10)
                    return <FAQ 
                            key={item.id}
                            title={item.title} 
                            category={item.category} 
                            solution={item.solution} 
                            openList={openList}/> })}
            </div>
        )
    } else {
        return (
            <div className='FAQlist' >
                    <FAQsearch categoryOut={categoryOut} detectSearch={detectSearch}/>
                    { FAQfilterOBJ().map(mapItem).length === 0 ? 
                    <FAQNothingOnSearch/> : 
                    FAQfilterOBJ().map(mapItem) }
                <AddList />
            </div>

        )
    }
};



//=========================================================================
//리스트 오픈 제어 함수 -> FAQ에 전달

let FAQlastClick = true;


function openList(e){
    let FAQctn =e.target.closest('.FAQ_container');
    let content = FAQctn.children;
    let answer = content[1];
    let FAQlistICON = content[0].children[2];
    const InnerHeight = answer.scrollHeight

    console.log('render됨')

    //이전요소 찾아서 닫기
    if (FAQctn != FAQlastClick && FAQlastClick != true) {
        //FAQlastClick != true 조건은 최초 클릭시 에러 방지

        FAQlastClick.children[0].children[2].textContent = '+'
        FAQlastClick.style.height = `${48}px`
        FAQctn.classList.remove('showList')
    } 

    if(!FAQctn.classList.contains('showList')) {
        FAQctn.style.height = `${InnerHeight + 48}px`
        FAQctn.classList.add('showList')
        FAQlistICON.textContent = '−'

        FAQlastClick = FAQctn;
    } else {
        FAQctn.style.height = `${48}px`
        FAQctn.classList.remove('showList')
        FAQlistICON.textContent = '+'
    }
};

    
//=========================================================================