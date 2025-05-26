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
      <h1 className="text-center mb-4">Liste des tâches</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <span>{task.text}</span>
            <span className="badge badge-secondary ms-2">Priorité : {task.priority}</span>
            <span className="badge badge-info ms-2">Statut : {task.status}</span>
            {task.status === 'Terminée' && (
              <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(task.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Texte de la tâche" />
        </div>
        <div className="mb-3">
          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Haute">Haute</option>
            <option value="Normale">Normale</option>
            <option value="Basse">Basse</option>
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default App;