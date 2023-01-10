import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todolistReducer} from './todolistReducer';
import {tasksReducer} from './tasksReducer';
import {useDispatch} from 'react-redux';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type StateType = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


export default store;

// @ts-ignore
window.store = store;