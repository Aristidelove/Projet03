export const ATTRIBUTION = {
  statuses: [
    { value: "En cours", label: "En cours" },
    { value: "Terminé", label: "Terminé" },
    { value: "En attente", label: "En attente" },
  ],
  priorities: [
    { value: "Haute", label: "Haute" },
    { value: "Moyenne", label: "Moyenne" },
    { value: "Basse", label: "Basse" },
  ],
  renderSelect: (options, value, onChange, label) => (
    <div>
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">Sélectionner {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
  renderForm: (taskName, setTaskName, status, setStatus, priority, setPriority, dateFin, setDateFin, handleSubmit) => (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Nom de la tâche</label>
        <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </div>
      <div className="col-md-2">
        {ATTRIBUTION.renderSelect(ATTRIBUTION.statuses, status, (e) => setStatus(e.target.value), "Statut")}
      </div>
      <div className="col-md-2">
        {ATTRIBUTION.renderSelect(ATTRIBUTION.priorities, priority, (e) => setPriority(e.target.value), "Priorité")}
      </div>
      <div className="col-md-3">
        <label className="form-label">Date de fin</label>
        <input type="date" className="form-control" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
      </div>
      <div className="col-md-2 d-flex align-items-end">
        <button type="submit" className="btn btn-primary">Ajouter une tâche</button>
      </div>
    </form>
  ),
  renderTable: (tasks, handleDelete) => (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Nom de la tâche</th>
          <th>Status</th>
          <th>Priorité</th>
          <th>Date de fin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.name}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{task.dateFin}</td>
            <td>
              {task.status === "Terminé" && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Supprimer
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};