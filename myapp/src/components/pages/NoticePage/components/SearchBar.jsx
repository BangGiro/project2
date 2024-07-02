import { useEffect, useState } from "react";


const SearchBar = ({detectSearch , upDate}) => {
    
    const [searchText , setSearchText] = useState('');
    useEffect(()=> {
        console.log('upDate changed:', upDate); // upDate 값 변경 확인
        setSearchText('');
    }, [upDate]);

    function search(e) {
        setSearchText(e.target.value);
    }

    function setValue( e ) {
        if(e.key == 'Enter' ) {
            console.log(searchText);
            sessionStorage.setItem( 'searchedValue' , JSON.stringify(searchText) );
            detectSearch(searchText);
        }
    }

    return <input value={searchText} 
                className="NoticeSearchBar" 
                onChange={search}
                onKeyDown={setValue}
                placeholder="검색 및 검색 초기화를 하려면 엔터를 누르세요."
                />
}

export default SearchBar;