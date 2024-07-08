import { useState } from "react";


const SearchBar = ({detectSearch}) => {
    
    const [searchText , setSearchText] = useState('');
    
    function search(e) {
        setSearchText(e.target.value);
    }

    function setValue( e ) {
        if(e.key == 'Enter' ) {
            console.log(searchText);
            sessionStorage.setItem( 'searchedValue' , JSON.stringify(searchText) );
            detectSearch();
        }
    }

    return <input value={searchText} 
                className="FAQsearchBar" 
                onChange={search}
                onKeyDown={setValue}
                placeholder="검색 및 검색 초기화를 하려면 엔터를 누르세요."
                />
}

export default SearchBar;