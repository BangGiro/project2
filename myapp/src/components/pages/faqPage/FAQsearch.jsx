
import SearchBar from "./SearchBar";


const FAQsearch = function({categoryOut , detectSearch }) {

    return(
        <div className="FAQsearchContainer" >
            <select className="FAQselect" onChange={categoryOut} >
                <option value="all" key="">카테고리 전체</option>
                <option value="서비스" key="">서비스</option>
                <option value="결제" key="">결제</option>
                <option value="환불" key="">환불</option>
                <option value="계정" key="">계정</option>
                <option value="기타" key="">기타</option>
            </select>
            <SearchBar detectSearch={detectSearch}/>
        </div>
    )
};


export default FAQsearch;