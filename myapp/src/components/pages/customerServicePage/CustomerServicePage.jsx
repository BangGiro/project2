import './CustomerServicePage.css'
import NoticePage from '../NoticePage/NoticePage';
import FAQpage from '../faqPage/FAQpage';
import QnAPage from '../QnAPage/QnAPage';


const CustomerServicePage = () => {
    return (
        <div className="CustomerServicePage">
            <h1>고객지원</h1>
            <div className='customerServices'>
                <section className='CTM_notice'><NoticePage isMini={true}/></section>
                <section className='CTM_faq'><FAQpage isMini={true}/></section>
                <section className='CTM_qna'></section>
            </div>
        </div>
    )
}

export default CustomerServicePage;