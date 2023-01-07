import {TodolistType} from '../API/API';
import {createAction, createReducer} from '@reduxjs/toolkit';


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
