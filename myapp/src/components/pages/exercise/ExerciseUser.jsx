import React from 'react';
import ExerciseMain from './ExerciseMain';
import { useLocation } from 'react-router-dom';

function ExerciseUser() {
  const location = useLocation();
  const user = location.state;
  const userId = user?.userId;
  const userName = user?.name;

  return (
    <ExerciseMain userId={userId} isUserMode={true} userName={userName} />
  );
}

export default ExerciseUser;
