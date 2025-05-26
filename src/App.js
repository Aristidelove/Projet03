import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Normale');
  const [status, setStatus] = useState('À faire');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), text, priority, status, date: new Date().toLocaleDateString() };
    setTasks([...tasks, newTask]);
    setText('');
    setPriority('Normale');
    setStatus('À faire');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenue dans votre gestionnaire de tâches !</h1>
      <p className="text-center">Cette application vous permet de créer, gérer et suivre vos tâches quotidiennes.</p>
      {tasks.length === 0 ? (
        <p className="text-center">Vous n'avez aucune tâche pour le moment. Cliquez sur "Ajouter une tâche" pour commencer !</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <span>{task.text}</span>
              <span className="ms-3">Priorité : {task.priority}</span>
              <span className="ms-3">Statut : {task.status}</span>
              <span className="ms-3">Date : {task.date}</span>
              {task.status === 'Terminée' && (
                <button className="btn btn-danger float-end" onClick={() => handleDelete(task.id)}>Supprimer</button>
              )}
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-primary mt-3" onClick={() => setShowForm(true)}>Ajouter une tâche</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Texte de la tâche" className="form-control mb-2" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-select mb-2">
            <option value="Haute">Haute</option>
            <option value="Normale">Normale</option>
            <option value="Basse">Basse</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select mb-2">
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
          <button type="submit" className="btn btn-primary">Ajouter</button>
          <button className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Annuler</button>
        </form>
      )}
    </div>
  );
}

export default App;