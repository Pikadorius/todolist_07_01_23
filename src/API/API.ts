import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'abc137fc-ad0c-49be-975b-e12bdb8a93ad'
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
}

export const todolistsAPI = {
    getTodolists: () => instance.get<TodolistType[]>('/todo-lists').then(res => res.data),
    createTodolist: (title: string) => instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title}).then(res => res.data),
    deleteTodolist: (todolistId: string) => instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
}


export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

export type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks: (todolistId: string) => instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`).then(res => res.data),
    createTask: (todolistId: string, title: string) => instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title}),
    deleteTask: (todolistId: string, taskId: string) => instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
}
