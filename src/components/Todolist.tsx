import React, {useEffect} from 'react';
import {TaskResponseType, tasksAPI, todolistsAPI, TodolistType} from '../API/API';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../redux/store';
import {addNewTaskTC, setTasks} from '../redux/tasksReducer';
import Task from './Task';
import {deleteTodolistAC} from '../redux/todolistReducer';
import AddItemForm from './AddItemForm';

const Todolist = (props: TodolistType) => {
    const tasks = useSelector<StateType, TaskResponseType>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    useEffect(() => {
        tasksAPI.getTasks(props.id).then(res => dispatch(setTasks(props.id, res)))
    }, [])

    const deleteTodo = () => {
        todolistsAPI.deleteTodolist(props.id).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(props.id))
            }
        })
    }

    const addNewTask = (title: string) => {
        /*tasksAPI.createTask(props.id, title).then(res => {
            console.log(res)
            debugger
            if (res.data.resultCode === 0) {
                dispatch(createNewTask(props.id, res.data.data.item))
            }
        })*/
        addNewTaskTC(props.id, title)(dispatch)
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