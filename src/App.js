import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Tâche 1', priority: 'Haute', status: 'À faire' },
    { id: 2, text: 'Tâche 2', priority: 'Normale', status: 'En cours' },
    { id: 3, text: 'Tâche 3', priority: 'Basse', status: 'Terminée' },
  ]);

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Normale');
  const [status, setStatus] = useState('À faire');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), text, priority, status };
    setTasks([...tasks, newTask]);
    setText('');
    setPriority('Normale');
    setStatus('À faire');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Liste des tâches</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <span>{task.text}</span>
            <span className="ms-3">Priorité : {task.priority}</span>
            <span className="ms-3">Statut : {task.status}</span>
            {task.status === 'Terminée' && (
              <button className="btn btn-danger float-end" onClick={() => handleDelete(task.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
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
      </form>
    </div>
  );
}

export default App;