import { useEffect, useRef } from "react";

export default function PageNation({ currentList, noticesPerPage, paginate }) {
    let previousPage = useRef(null) ;


    useEffect(() => {
        previousPage.current = document.querySelector('.paginateBTN');
        if(previousPage.current) {
            previousPage.current.classList.add('PageNationActive');
        }
    }
    ,[]);

    function PageEvent(e , index) {
        if (e.target !== previousPage.current) {
            e.target.classList.add('PageNationActive');
            previousPage.current.classList.remove('PageNationActive');
        } 
        paginate(index + 1);
        previousPage.current = e.target;
    }

    return (
        <div className="pagination">
        {Array.from({ length: Math.ceil(currentList.length / noticesPerPage) }, (_, index) => (
            <button className="paginateBTN" key={index} onClick={(e) => PageEvent( e, index )}>
                {index + 1}
            </button> 
        ))}
        </div>
    )

}