
export default function PageNation({ currentList, noticesPerPage, paginate }) {

    let previousPage;
    

    return (
        <div className="pagination">
        {Array.from({ length: Math.ceil(currentList.length / noticesPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
            </button> 
        ))}
        </div>
    )

}