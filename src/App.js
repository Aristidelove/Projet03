import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [
      { id: 1, text: 'Tâche 1', priority: 'Haute', status: 'À faire' },
      { id: 2, text: 'Tâche 2', priority: 'Normale', status: 'En cours' },
      { id: 3, text: 'Tâche 3', priority: 'Basse', status: 'Terminée' },
    ];
  });

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Normale');
  const [status, setStatus] = useState('À faire');
  const [filter, setFilter] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      alert('Veuillez entrer un texte pour la tâche');
      return;
    }
    if (editTask) {
      setTasks(tasks.map((task) => task.id === editTask.id ? { ...task, text, priority, status } : task));
      setEditTask(null);
    } else {
      const newTask = { id: Date.now(), text, priority, status };
      setTasks([...tasks, newTask]);
    }
    setText('');
    setPriority('Normale');
    setStatus('À faire');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setText(task.text);
    setPriority(task.priority);
    setStatus(task.status);
  };

  const filteredTasks = tasks.filter((task) => task.status.includes(filter));

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Liste des tâches</h1>
      <table>
        <thead>
          <tr>
            <th>Tâche</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.text}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Modifier</button>
                {task.status === 'Terminée' && (
                  <button className="delete-button" onClick={() => handleDelete(task.id)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Tous</option>
        <option value="À faire">À faire</option>
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
      </select>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Texte de la tâche" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Haute">Haute</option>
          <option value="Normale">Normale</option>
          <option value="Basse">Basse</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
        <button className="add-button" type="submit">{editTask ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
}

export default App;