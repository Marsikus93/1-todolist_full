import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    let [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    console.log(tasks1)
    let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask = (id: string) => {
        let filteredTasks = tasks1.filter(t => id !== t.id)
        setTasks1(filteredTasks)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasksArray = [newTask, ...tasks1]
        setTasks1(newTasksArray)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks1.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks1([...tasks1])
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    let tasksForTodolist = tasks1;
    if (filter === "completed") {
        tasksForTodolist = tasks1.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks1.filter(t => t.isDone === false)
    }
    return (
        <div>
            <TodoList title={"what to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}

            />
        </div>

    );
}

export default App;
