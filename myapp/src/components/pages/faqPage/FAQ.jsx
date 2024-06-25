export default function FAQ({category='서비스' , title='제목', solution='답변',  openList }) {
    
    
    return (
            <ul className="FAQ_container">
                <li onClick={openList}>
                    <p className='FAQlist_category'>{category}</p>
                    <p className="FAQlist_title">{title}</p>
                    <span className="FAQlist_Icon">+</span>
                </li>
                <li className="List_answer">
                    {solution}
                </li>
            </ul>
    )
};

