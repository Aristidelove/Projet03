class Task {
  constructor(id, title, description, priority, status, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.date = date;
  }

  isCompleted() {
    return this.status === "completed";
  }
  isHighPriority() {
    return this.priority === "high";
  }
  isMediumPriority() {
    return this.priority === "medium";
  }
  isLowPriority() {
    return this.priority === "low";
  }
  isOverdue() {
    const today = new Date();
    const taskDate = new Date(this.date);
    return taskDate < today && !this.isCompleted();
  }
}

export default Task;


