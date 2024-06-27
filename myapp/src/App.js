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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
