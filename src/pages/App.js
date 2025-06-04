import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import TaskComponent from './COMPONENT';

const Accueil = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" >
      <div className="text-center">
        <h1 className="display-5 fw-bold fst-italic ">BIENVENUE DANS VOTRE GESTIONNAIRE DE TÂCHES</h1>
        <Link to="/tasks" style={{ color: 'blue', textDecoration: 'underline' }} className="btn btn-link mt-3">Voir les tâches</Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Accueil />} />
        <Route path="/tasks" element={<TaskComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;