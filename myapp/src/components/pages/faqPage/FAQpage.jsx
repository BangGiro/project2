import FAQlist from './FAQlist'
import FAQheader from './FAQheader';
import './FAQ.css';
import { useCallback, useEffect } from 'react';


const FAQpage = function() {

    return(
        <div className="FAQpage">
            <FAQheader />
            <FAQlist />
        </div>
    )
};

export default FAQpage;


//===================================================================
//계륵 코드

// let ScrollbarDetected = false;
// let FAQpageTag = document.querySelector('.FAQpage');

// function DetectScrollbar() {
//     ScrollbarDetected = document.documentElement.scrollHeight > document.documentElement.clientHeight ?
//     true : null ;

//     if(ScrollbarDetected) {
//         FAQpageTag.style.marginRight='-19px'
//     } 
// }

// useCallback(()=> DetectScrollbar(), [document.documentElement.scrollHeight])