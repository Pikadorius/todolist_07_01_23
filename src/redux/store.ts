import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todolistReducer} from './todolistReducer';
import {tasksReducer} from './tasksReducer';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type StateType = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer
})

export default store;

// @ts-ignore
window.store = store;