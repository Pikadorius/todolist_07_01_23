import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../redux/store';
import {tasksAPI, TaskType} from '../API/API';
import {deleteTaskAC} from '../redux/tasksReducer';

type TaskUIType = {
    taskId: string
    todolistId: string
}

const Task = (props: TaskUIType) => {
    const task = useSelector<StateType, TaskType>(state => state.tasks[props.todolistId].items.filter(t => t.id === props.taskId)[0])
    const dispatch = useDispatch()
    const deleteTask = () => {
        tasksAPI.deleteTask(props.todolistId, props.taskId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(props.todolistId, props.taskId))
            }
        })
    }

    return (
        <li>
            {task.title}
            <button onClick={deleteTask}>x</button>
        </li>
    );
};

export default Task;