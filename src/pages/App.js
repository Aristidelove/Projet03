import React from 'react';
import TaskComponent from './COMPONENT';

const App = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-5 fw-bold">BIENVENUE DANS VOTRE GESTIONNAIRE DE TÂCHES</h1>
      <TaskComponent />
    </div>
  );
};

export default App;