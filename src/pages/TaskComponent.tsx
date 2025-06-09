import Task from "../models/Task";


interface TaskComponentProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskComponent: React.FC<TaskComponentProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="task-item d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="task-details">
        <h5 className={`task-title ${task.isCompleted() ? 'text-decoration-line-through' : ''}`}>
          {task.title}
        </h5>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <button
          className={`btn btn-${task.isCompleted() ? 'secondary' : 'primary'}`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.isCompleted() ? 'Reprendre' : 'Compléter'}
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => onDelete(task.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}