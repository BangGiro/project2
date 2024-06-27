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
import FindPw from './components/login/components/FindPw';
import SignUp from './components/login/components/SingUp';
import Management from './components/management/ManagementContainer.jsx';


function App() {
  const [loggedInEmail, setLoggedInEmail] = useState('');

  const handleLogin = (email) => {
    setLoggedInEmail(email);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Management" element={<Management loggedInEmail={loggedInEmail} />} />
        
        <Route path="/exerciseMain" element={<ExerciseMain />} />
        <Route path="/dietPlanner" element={<DietPlanner />} />
        <Route path="/FAQpage" element={<FAQpage />} />
        <Route path="/sleepTracker" element={<SleepTracker />} />
        <Route path="/FindPw" element={<FindPw />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
