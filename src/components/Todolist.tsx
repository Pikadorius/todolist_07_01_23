import React, {useEffect} from 'react';
import {TaskResponseType, TodolistType} from '../API/API';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StateType} from '../redux/store';
import {addNewTaskTC, getTasksForTodolist} from '../redux/tasksReducer';
import Task from './Task';
import {deleteTodolistTC} from '../redux/todolistReducer';
import AddItemForm from './AddItemForm';

const Todolist = (props: TodolistType) => {
    const tasks = useSelector<StateType, TaskResponseType>(state => state.tasks[props.id])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getTasksForTodolist(props.id))
    }, [])

    const deleteTodo = () => {
        dispatch(deleteTodolistTC(props.id))
    }

    const addNewTask = (title: string) => {
        dispatch(addNewTaskTC(props.id, title))
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodo}>X</button>
            </h3>

            <p>{props.id}</p>
            <AddItemForm addItem={addNewTask}/>
            <ul>
                {tasks && tasks.items.map(t => <Task key={t.id} todolistId={props.id} taskId={t.id}/>)}
            </ul>
        </div>
    );
};

export default Todolist;