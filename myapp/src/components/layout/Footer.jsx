import './Footer.css';

function Footer(){
    return(
        <footer>
            <hr/>
            <div className="company-info">
                <p>상호명: ABC 주식회사</p>
                <p>사업자등록번호: 123-45-67890</p>
                <p>주소: 서울특별시 강남구 가로수길 1234</p>
                <p>전화번호: 02-1234-5678</p>
            </div>
            <div className="copyright">
                &copy; 2024 ABC 주식회사. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;