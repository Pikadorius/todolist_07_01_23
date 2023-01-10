import {todolistsAPI, TodolistType} from '../API/API';
import {createAction, createReducer} from '@reduxjs/toolkit';
import {AppDispatch} from './store';

export type  FilterValueType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {filter: FilterValueType}

const initialState = [] as TodolistType[]

/*
export const todolistReducer = (state=initialState,action:SetTodolistACType):TodolistType[]=> {
    switch (action.type) {
        case 'SET_TODOS': {
            return [...action.payload]
        }
        default: return state;
    }
}
*/
// export const setTodolists = (state: TodolistType[]) => {
//     return {
//         type: 'SET_TODOLISTS',
//         payload: {
//             state
//         }
//     }
// }

export const setTodolists = createAction<TodolistType[]>('SET_TODOS')
export const deleteTodolistAC = createAction<string>('DELETE_TODO')
export const addTodolistAC = createAction<TodolistType>('ADD_NEW_TODOLIST')

export const todolistReducer = createReducer(initialState, builder => {
    builder.addCase(setTodolists, (state, action) => {
        return [...action.payload]
    })
    builder.addCase(deleteTodolistAC, (state, action) => {
        return state.filter(t => t.id !== action.payload)
    })
    builder.addCase(addTodolistAC, (state, action) => {
        return [action.payload, ...state]
    })

})


export const deleteTodolistTC = (todolistId:string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTodolist(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodolistAC(todolistId))
        }
    })
}