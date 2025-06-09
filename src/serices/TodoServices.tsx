import Task from "../models/Task";
const taskKey = "MY_TASK";
export class TodoServices {
    getTodosFromStorage(): Task[] {
        try {
            const response = localStorage.getItem(taskKey);
            if (!response) {
                return [];
            }
            const result = JSON.parse(response);
            return result.map((taskData: any) => new Task(taskData.id, taskData.title, taskData.description, taskData.priority, taskData.status, taskData.date));
        } catch (error) {
            console.error("Unable to get datas " + error);
            return [];
        }
    }

    saveTodo(todo: Task) {
        try {
            const todos = this.getTodosFromStorage();
            todos.push(todo);
            localStorage.setItem(taskKey, JSON.stringify(todos));
        } catch (error) {
            throw "Unable to save todo " + error;
        }
    }

    deleteTodo(id: string) {
        try {
            const todos = this.getTodosFromStorage();
            const updatedTodos = todos.filter(todo => todo.id !== id);
            localStorage.setItem(taskKey, JSON.stringify(updatedTodos));
        } catch (error) {
            throw "Unable to delete todo " + error;
        }
    }

    updateTodo(id: string, updatedTodo: Task) {
        try {
            const todos = this.getTodosFromStorage();
            const todoIndex = todos.findIndex(todo => todo.id === id);
            if (todoIndex === -1) {
                throw "Todo not found";
            }
            todos[todoIndex] = updatedTodo;
            localStorage.setItem(taskKey, JSON.stringify(todos));
        } catch (error) {
            throw "Unable to update todo " + error;
        }
    }

}