import { useState, useEffect, useMemo } from "react";
import Task from "../models/Task";
import { TodoServices } from "../serices/TodoServices";
import { TaskComponent } from "./TaskComponent";

export const Home = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const todoService = useMemo(() => new TodoServices(), []);

    useEffect(() => {
        setLoading(true);
        const storedTasks = todoService.getTodosFromStorage();
        if (storedTasks) {
            setTaskList(storedTasks);
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Shorter delay
        return () => clearTimeout(timer);
    }, [todoService]);

    const addTask = () => {
        const newTask = new Task(Date.now().toString(), `New Task ${taskList.length + 1}`, 'A new task', 'medium', 'pending', new Date().toISOString());
        todoService.saveTodo(newTask);
        setTaskList(prevTasks => [...prevTasks, newTask]);
    }

    const deleteTask = (id: string) => {
        todoService.deleteTodo(id);
        setTaskList(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    const toggleComplete = (id: string) => {
        const taskToUpdate = taskList.find(task => task.id === id);
        if (taskToUpdate) {
            const newStatus = taskToUpdate.isCompleted() ? "pending" : "completed";
            const updatedTask = new Task(taskToUpdate.id, taskToUpdate.title, taskToUpdate.description, taskToUpdate.priority, newStatus, taskToUpdate.date);
            todoService.updateTodo(id, updatedTask);
            setTaskList(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-600">Loading...</h1>
                    <p className="text-gray-600">Please wait while we fetch your tasks.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-600">Welcome to the Todo App</h1>
                <p className="text-lg text-gray-700 mt-2">Your tasks will be displayed here.</p>
            </div>

            <div className="mt-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Your Tasks</h2>
                    <button onClick={addTask} className="btn btn-primary">Add Task</button>
                </div>
                {taskList.length > 0 ? (
                    <ul className="list-none p-0">
                        {taskList.map((task: Task) => (
                            <li key={task.id} className="mb-2">
                                <TaskComponent
                                    task={task}
                                    onToggleComplete={toggleComplete}
                                    onDelete={deleteTask}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-4 border rounded bg-white">
                        <p className="text-gray-600">No tasks available. Please add some tasks.</p>
                    </div>
                )}
            </div>
        </div>
    );
}