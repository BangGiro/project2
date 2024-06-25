import './App.css';
import React from "react";
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer';
import ExerciseMain from './components/pages/exercise/ExerciseMain.jsx';
import DietPlanner from './components/pages/DietPlanner.jsx'; 
import DietPlannerSelf from './components/pages/DietPlannerSelf.jsx';
import FAQpage from './components/pages/faqPage/FAQpage.jsx';
// import ExerciseJournal from './components/pages/exercise/ExerciseJournal.jsx';
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/exercise/exerciseMain" element={<ExerciseMain />} />
        <Route path="/dietPlanner" element={<DietPlanner />} />
        <Route path="/dietPlannerSelf" element={<DietPlannerSelf />} />
        <Route path="/FAQpage" element={<FAQpage />} />
      </Routes>
      <Footer />
      {/* <Router>
        <Header />
          <Route path="/">
            <ExerciseMain />
          </Route> */}
            {/* <ExerciseJournal /> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
