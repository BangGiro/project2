import './CustomerServicePage.css'
import NoticePage from '../NoticePage/NoticePage';
import FAQlist from '../faqPage/FAQlist';
import QnAPage from '../QnAPage/QnAPage';
import { Link } from 'react-router-dom';


const CustomerServicePage = () => {
    return (
        <div className="CustomerServicePage">

            <div className='customerServices'>
                <section className='CTM_notice'>
                    <h3>📢공지사항
                        <Link className='CTMlinks' to="/noticePage">
                            ➡️더보기
                        </Link>
                    </h3>
                    <NoticePage isMini={true}/>
                </section>
                <section className='CTM_faq'>
                    <h3>📌자주 묻는 질문
                        <Link className='CTMlinks' to="/FAQpage">
                            ➡️더보기
                        </Link>
                    </h3>
                    <FAQlist isMini={true}/>
                </section>
            </div>

            <section className='CTM_qna'>
                <img src="/image/undraw_questions.svg" alt="" />
                <p>
                해결되지 않는 문제가 있으신가요? 
                </p>
                <Link className='CTMtoQnA' to="/QnAPage">
                📧1:1 문의하기
                </Link>
            </section>
        </div>
    )
}

export default CustomerServicePage;