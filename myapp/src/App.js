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
import PrivateRoute from './components/pages/PrivateRoute/PrivateRoute';
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
import { axios } from 'axios';
import ProductList from './components/pages/Shop/ProductList';
import ProductDetail from './components/pages/Shop/ProductDetail';
import Cart from './components/pages/Shop/Cart';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedEmail = localStorage.getItem('memberLoggedInData') || '';
    setLoggedIn(storedLoggedIn);
    setLoggedInEmail(storedEmail);
  }, []);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setLoggedInEmail(email);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('memberLoggedInData', email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInEmail('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('memberLoggedInData');
  };
   
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <Routes>
        {/* 헤더랑 푸터가 포함된 페이지 */}
        <Route path="/" element={<Layout loggedIn={loggedIn} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/exerciseMain" element={<ExerciseMain  />} />
          <Route path="/dietPlanner" element={<DietPlanner />} />
          <Route path="/FAQpage" element={<FAQpage />} />
          <Route path="/sleepTracker" element={<SleepTracker  />} />
          <Route path="/management" element={ <Management  />} />
          <Route path="/QnAPage" element={<QnAPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/previousTerms" element={<PreviousTerms />} />
          <Route path='/noticePage' element={<NoticePage />} />
          <Route path='/exerciseUser' element={<ExerciseUser />} />
          <Route path='/customerServicePage' element={<CustomerServicePage />} />
          <Route path="/youthProtectionPolicy" element={<YouthProtectionPolicy/>} />
          <Route path="/brandProtectionPolicy" element={<BrandProtectionPolicy/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/announcement" element={<Announcement/>} />
          <Route path="/cyberAuditOffice" element={<CyberAuditOffice/>} />
          <Route path="/contactUs" element={<ContactUs/>} />
          <Route path="/myPage" element={<MyPage  />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/shop/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        </Route>
        {/* 헤더랑 푸터가 포함되지 않은 페이지 */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/findPw" element={<FindPw />} />
      </Routes>
    </div>
  );
}

export default App;
