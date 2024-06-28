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
import SignUp from './components/login/SingUp';
import Management from './components/management/ManagementContainer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedEmail = localStorage.getItem('loggedInEmail') || '';
    setLoggedIn(storedLoggedIn);
    setLoggedInEmail(storedEmail);
  }, []);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setLoggedInEmail(email);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loggedInEmail', email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInEmail('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInEmail');
  };

  return (
    <div className="App">
      <Routes>
        {/* 헤더랑 푸터가 포함된 페이지 */}
        <Route path="/" element={<Layout loggedIn={loggedIn} onLogout={handleLogout} />}>
          <Route path="exerciseMain" element={<PrivateRoute element={<ExerciseMain />} />} />
          <Route path="dietPlanner" element={<PrivateRoute element={<DietPlanner />} />} />
          <Route path="FAQpage" element={<FAQpage />} />
          <Route path="sleepTracker" element={<PrivateRoute element={<SleepTracker />} />} />
          <Route path="management" element={<PrivateRoute element={<Management loggedInEmail={loggedInEmail} />} />} />
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
