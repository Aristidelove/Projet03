import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() { 
  const [tasks, setTasks] = useState([]); 
  const [text, setText] = useState(''); 
  const [priority, setPriority] = useState('Normale'); 
  const [status, setStatus] = useState('À faire'); 
  const [endDate, setEndDate] = useState(''); 
  const [showForm, setShowForm] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [taskToUpdate, setTaskToUpdate] = useState(null); 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (taskToUpdate) { 
      const updatedTasks = tasks.map((task) => { 
        if (task.id === taskToUpdate.id) { 
          return { ...task, text, priority, status, endDate }; 
        } 
        return task; 
      }); 
      setTasks(updatedTasks); 
      setTaskToUpdate(null); 
    } else { 
      const newTask = { 
        id: Date.now(), 
        text, 
        priority, 
        status, 
        startDate: new Date().toLocaleDateString(), 
        endDate: endDate 
      }; 
      setTasks([...tasks, newTask]); 
    } 
    setText(''); 
    setPriority('Normale'); 
    setStatus('À faire'); 
    setEndDate(''); 
    setShowForm(false); 
  }; 

  const handleDelete = (id) => { 
    setTasks(tasks.filter((task) => task.id !== id)); 
  }; 

  const handleUpdate = (task) => { 
    setTaskToUpdate(task); 
    setText(task.text); 
    setPriority(task.priority); 
    setStatus(task.status); 
    setEndDate(task.endDate); 
    setShowForm(true); 
  }; 

  const filteredTasks = tasks.filter((task) => task.text.toLowerCase().includes(searchTerm.toLowerCase())); 

  return ( 
    <div className="container mt-5"> 
      <h1 className="text-center">Bienvenue dans votre gestionnaire de tâches !</h1> 
      <p className="text-center">Cette application vous permet de créer, gérer et suivre vos tâches quotidiennes.</p> 
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher une tâche" className="form-control mb-2" /> 
      {filteredTasks.length === 0 ? ( 
        <p className="text-center">Vous n'avez aucune tâche pour le moment. Cliquez sur "Ajouter une tâche" pour commencer !</p> 
      ) : ( 
        <ul className="list-group"> 
          {filteredTasks.map((task) => ( 
            <li key={task.id} className="list-group-item"> 
              <span>{task.text}</span> 
              <span className="ms-3">Priorité : {task.priority}</span> 
              <span className="ms-3">Statut : {task.status}</span> 
              <span className="ms-3">Date de début : {task.startDate}</span> 
              {task.endDate && ( 
                <span className="ms-3">Date de fin : {task.endDate}</span> 
              )} 
              <button className="btn btn-primary float-end ms-2" onClick={() => handleUpdate(task)}>Modifier</button> 
              {task.status === 'Terminée' && ( 
                <button className="btn btn-danger float-end" onClick={() => handleDelete(task.id)}>Supprimer</button> 
              )} 
            </li> 
          ))} 
        </ul> 
      )} 
      <button className="btn btn-primary mt-3" onClick={() => { setShowForm(true); setTaskToUpdate(null); }}>Ajouter une tâche</button> 
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
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Date de fin" className="form-control mb-2" /> 
          <button type="submit" className="btn btn-primary">Ajouter</button> 
          <button className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Annuler</button>
   </form>
      )}
    </div>
  );
}

export default App;

