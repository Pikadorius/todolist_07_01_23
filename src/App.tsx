import React from 'react';
import './App.css';
import {todolistsAPI, TodolistType} from './API/API';
import {useDispatch, useSelector} from 'react-redux';
import {addTodolistAC, setTodolists} from './redux/todolistReducer';
import {StateType} from './redux/store';
import Todolist from './components/Todolist';
import AddItemForm from './components/AddItemForm';

function App() {

    const todolists = useSelector<StateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const getTodos = () => {
        todolistsAPI.getTodolists().then(data => dispatch(setTodolists(data)))
    }

    const addTodolist = (title: string) => {
        todolistsAPI.createTodolist(title).then(res => {
            if (res.resultCode === 0) {
                dispatch(addTodolistAC(res.data.item))
            }
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            <button onClick={getTodos}>get todolist</button>
            {
                todolists.map(t => <Todolist
                    key={t.id} title={t.title} id={t.id} addedDate={t.addedDate} order={t.order}/>)
            }

        </div>
    );
}

export default App;
