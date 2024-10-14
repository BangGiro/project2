
import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ExerciseMain from './components/pages/exercise/ExerciseMain';
import DietPlanner from './components/pages/DietPlanner/DietPlanner';
import FAQpage from './components/pages/faqPage/FAQpage';
import SleepTracker from './components/pages/sleepTracker/SleepTracker';
import Login from './components/pages/login/Login';
import FindPw from './components/pages/login/FindPw';
import SignUp from './components/pages/login/SignUp';
import Management from './components/pages/management/ManagementContainer';
import QnAPage from './components/pages/QnAPage/QnAPage';
import PrivacyPolicy from './components/pages/footerPages/PrivacyPolicy';
import TermsOfService from './components/pages/footerPages/TermsOfService';
import PreviousTerms from './components/pages/footerPages/PreviousTerms';
import Home from './components/pages/home/Home';
import NoticePage from './components/pages/NoticePage/NoticePage';
import ExerciseUser from './components/pages/exercise/ExerciseUser';
import CustomerServicePage from './components/pages/customerServicePage/CustomerServicePage';
import YouthProtectionPolicy from './components/pages/footerPages/YouthProtectionPolicy';
import BrandProtectionPolicy from './components/pages/footerPages/BrandProtectionPolicy';
import Report from './components/pages/footerPages/Report';
import Announcement from './components/pages/footerPages/Announcement';
import CyberAuditOffice from './components/pages/footerPages/CyberAuditOffice';
import ContactUs from './components/pages/footerPages/ContactUs';
import MyPage from './components/pages/MyPage/MyPage';
import ProductList from './components/pages/Shop/ProductList';
import ProductDetail from './components/pages/Shop/ProductDetail';
import Cart from './components/pages/Shop/Cart';
import CheckoutPage from './components/pages/Shop/CheckoutPage';
import ScheduleCalender from './components/pages/scheduleManagement/Schedules';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInfo, setLoggedInfo] = useState(null); // null로 초기화
  const [loggedId, setLoggedId] = useState('');
  
  // 로그인 상태 확인
  useEffect(() => {
    setLoggedIn(false);
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedId = localStorage.getItem('memberLoggedInData') || '';
    setLoggedIn(storedLoggedIn);
    setLoggedId(storedId);
  }, []);

  // 로그인 처리
  const handleLogin = (response) => {
    setLoggedIn(true);
    setLoggedInfo(response);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('memberLoggedInData', response.userId); // userId 저장
    setLoggedId(response.userId); // loggedId 상태에 userId 저장
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInfo(null);
    setLoggedId('');
    sessionStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('memberLoggedInData');
    localStorage.removeItem('JwtToken');
  };

  // 장바구니 항목 상태
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 제품 추가하는 함수
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // 장바구니에서 제품 제거하는 함수
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <Routes>
        {/* 헤더와 푸터가 포함된 페이지 */}
        <Route path="/" element={<Layout loggedIn={loggedIn} onLogout={handleLogout} loggedId={loggedId} />}>
          <Route path="/" element={<Home />} />
          <Route path="/exerciseMain" element={<ExerciseMain userId={loggedId}/>} />
          <Route path="/exerciseUser" element={<ExerciseUser userId={loggedId}/>} />
          <Route path="/dietPlanner" element={<DietPlanner />} />
          <Route path="/FAQpage" element={<FAQpage />} />
          <Route path="/sleepTracker" element={<SleepTracker userId={loggedId}/>} />
          <Route path="/management" element={<Management />} />
          <Route path="/QnAPage" element={<QnAPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/previousTerms" element={<PreviousTerms />} />
          <Route path="/noticePage" element={<NoticePage />} />
          <Route path="/customerServicePage" element={<CustomerServicePage />} />
          <Route path="/youthProtectionPolicy" element={<YouthProtectionPolicy />} />
          <Route path="/brandProtectionPolicy" element={<BrandProtectionPolicy />} />
          <Route path="/report" element={<Report />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/cyberAuditOffice" element={<CyberAuditOffice />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/product/:id" element={<ProductDetail userId={loggedId} onAddToCart={handleAddToCart} />} />
          <Route path="/shop/cart" element={<Cart userId={loggedId} cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} userId={loggedId}/>} />
          <Route path="/ScheduleCalender" element={<ScheduleCalender />} />

        </Route>
        {/* 헤더와 푸터가 포함되지 않은 페이지 */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/findPw" element={<FindPw />} />
      </Routes>
    </div>
  );
}

export default App;
