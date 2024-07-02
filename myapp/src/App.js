import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ExerciseMain from './components/pages/exercise/ExerciseMain';
import DietPlanner from './components/pages/DietPlanner';
import FAQpage from './components/pages/faqPage/FAQpage';
import SleepTracker from './components/pages/SleepTracker';
import Login from './components/login/Login';
import FindPw from './components/login/FindPw';
import SignUp from './components/login/SignUp';
import Management from './components/management/ManagementContainer';
import PrivateRoute from './components/PrivateRoute';
import QnAPage from './components/pages/QnAPage/QnAPage';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import PreviousTerms from './components/pages/PreviousTerms';
import Home from './components/pages/Home';
import NoticePage from './components/pages/NoticePage/NoticePage';
import ExerciseUser from './components/pages/exercise/ExerciseUser';
import CustomerServicePage from './components/pages/customerServicePage/CustomerServicePage';

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/exerciseMain" element={<ExerciseMain loggedInEmail={loggedInEmail} />} />
          <Route path="/dietPlanner" element={<DietPlanner />} />
          <Route path="/FAQpage" element={<FAQpage />} />
          <Route path="/sleepTracker" element={<SleepTracker loggedInEmail={loggedInEmail} />} />
          <Route path="/management" element={<PrivateRoute element={<Management loggedInEmail={loggedInEmail} />} />} />
          <Route path="/QnAPage" element={<QnAPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/previousTerms" element={<PreviousTerms />} />
          <Route path='/noticePage' element={<NoticePage />} />
          <Route path='/exerciseUser' element={<ExerciseUser />} />
          <Route path='/customerServicePage' element={<CustomerServicePage />} />
        </Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/findPw" element={<FindPw />} />
      </Routes>
    </div>
  );
}

export default App;
