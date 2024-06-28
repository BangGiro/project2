// src/App.js

import './App.css';
import React, { useState } from "react";
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer';
import ExerciseMain from './components/pages/exercise/ExerciseMain.jsx';
import DietPlanner from './components/pages/DietPlanner.jsx';
import FAQpage from './components/pages/faqPage/FAQpage.jsx';
import SleepTracker from './components/pages/SleepTracker.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import FindPw from './components/login/FindPw';
import SignUp from './components/login/SingUp';
import Management from './components/management/ManagementContainer.jsx';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  const handleLogin = (email) => {
    setLoggedIn(true);
    setLoggedInEmail(email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInEmail('');
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/management" element={<PrivateRoute element={<Management loggedInEmail={loggedInEmail} />} />} />
        <Route path="/exerciseMain" element={<PrivateRoute element={<ExerciseMain />} />}/>
        <Route path="/dietPlanner" element={<PrivateRoute element={<DietPlanner />} />}/>
        <Route path="/FAQpage" element={<FAQpage />} />
        <Route path="/sleepTracker" element={<PrivateRoute element={<SleepTracker />} />}/>
        <Route path="/findPw" element={<FindPw />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
