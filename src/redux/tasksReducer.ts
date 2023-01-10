import {TaskResponseType, tasksAPI, TaskType} from '../API/API';
import {createAction, createReducer, Dispatch} from '@reduxjs/toolkit';
import {addTodolistAC, deleteTodolistAC} from './todolistReducer';
import {AppDispatch} from './store';

type TaskStateType = {
    [key: string]: TaskResponseType
}

const initialState = {} as TaskStateType


export const setTasks = createAction('SET_TASKS', (todolistId: string, task: TaskResponseType)=>{
    return {
        payload: {
            todolistId,
            task
        }
    }
})
export const createNewTask = createAction('ADD_TASK', (todolistId: string, data: TaskType) => {
    return {
        payload: {
            todolistId,
            data
        }
    }
})
export const deleteTaskAC = createAction('DELETE_TASK', (todolistId: string, taskId: string) => {
    return {
        payload: {
            todolistId,
            taskId
        }
    }
})


export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(setTasks, (state, action) => {
        return {...state, [action.payload.todolistId]: action.payload.task}
    })
    builder.addCase(createNewTask, (state, action) => {
        return {
            ...state,
            [action.payload.todolistId]: {
                ...state[action.payload.todolistId],
                items: [action.payload.data, ...state[action.payload.todolistId].items]
            }
        }
    })
    builder.addCase(deleteTaskAC, (state, action) => {
        return {
            ...state,
            [action.payload.todolistId]: {
                ...state[action.payload.todolistId],
                items: state[action.payload.todolistId].items.filter(t => t.id !== action.payload.taskId)
            }
        }
    })
    builder.addCase(addTodolistAC, (state, action) => {
        return {...state, [action.payload.id]: {items: [], error: '', totalCount: 0}}
    })
    builder.addCase(deleteTodolistAC, (state, action) => {
        let copyState = {...state}
        delete copyState[action.payload]
        return {...copyState}
    })
})


export const addNewTaskTC = (todolistId: string, title: string) => (dispatch:AppDispatch) => {
    tasksAPI.createTask(todolistId, title).then(res => {
        console.log(res)
        debugger
        if (res.data.resultCode === 0) {
            dispatch(createNewTask(todolistId, res.data.data.item))
        }
    })
}


export const getTasksForTodolist = (todolistId:string) => (dispatch:AppDispatch) => {
    tasksAPI.getTasks(todolistId).then(res => dispatch(setTasks(todolistId, res)))
}