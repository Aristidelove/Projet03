export const RECHERCHE = {
  rechercheTaches: (tasks, searchTerm) => {
    return tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
  },
  trierTaches: (tasks, order) => {
    if (order === 'asc') {
      return tasks.sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(a.dateFin) - new Date(b.dateFin);
        } else {
          return a.priority.localeCompare(b.priority);
        }
      });
    } else if (order === 'desc') {
      return tasks.sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(b.dateFin) - new Date(a.dateFin);
        } else {
          return b.priority.localeCompare(a.priority);
        }
      });
    } else {
      return tasks;
    }
  }
};