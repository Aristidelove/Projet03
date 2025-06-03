import React, { useState } from 'react';
import { ATTRIBUTION } from './ATTRIBUTION';
import { RECHERCHE } from './RECHERCHE';

const TaskComponent = () => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name: taskName, status, priority, dateFin };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setStatus('');
    setPriority('');
    setDateFin('');
    setShowForm(false);
    setShowButton(true);
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const tachesRecherchees = RECHERCHE.rechercheTaches(tasks, searchTerm);
  const tachesTriees = RECHERCHE.trierTaches(tachesRecherchees, order);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Liste des tâches</h2>
      <div className="row">
        <div className="col-md-12">
          <input 
            type="text" 
            className="form-control" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Rechercher une tâche" 
          />
        </div>
      </div>
      {ATTRIBUTION.renderTable(tachesTriees, handleDelete)}
      {showButton && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setShowButton(false); }}>Ajouter une tâche</button>
        </div>
      )}
      {showForm && (
        <div>
          <h2 className="text-center mt-5 mb-4">Créer une tâche</h2>
          {ATTRIBUTION.renderForm(taskName, setTaskName, status, setStatus, priority, setPriority, dateFin, setDateFin, handleSubmit)}
        </div>
      )}
    </div>
  );
};

export default TaskComponent;