import './App.css';
import React from "react";
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer';
import ExerciseMain from './components/pages/exercise/ExerciseMain.jsx';
import DietPlanner from './components/pages/DietPlanner.jsx'; 
import FAQpage from './components/pages/faqPage/FAQpage.jsx';
import ManagementMain from './components/management/ManagementMain.jsx';
import SleepTracker from './components/pages/SleepTracker.jsx';
import { Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import FindPw from './components/login/components/FindPw';
import SignUp from './components/login/components/SingUp';

function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/exerciseMain" element={<ExerciseMain />} />
        <Route path="/dietPlanner" element={<DietPlanner />} />
        <Route path="/FAQpage" element={<FAQpage />} />
        <Route path="/managementMain" element={<ManagementMain />} />
        <Route path="/sleepTracker" element={<SleepTracker />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FindPw" element={<FindPw />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
