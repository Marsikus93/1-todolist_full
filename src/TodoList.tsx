import {FilterValuesType} from "./App";
import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            {
                props.addTask(newTaskTitle)
                setNewTaskTitle('')
            }
        }
    }
    const addTask = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={() => addTask(newTaskTitle)}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul> {
                props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                    onChange={onChangeHandler}
                                                                                    checked={t.isDone}
                        />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>)
                })
            }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
