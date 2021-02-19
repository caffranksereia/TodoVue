import { api } from './api';

export default {
    todoList:() =>{
        return api.get('/TodoList')
    },
    todoPost:() =>{
        return api.post('/TodoList')
    },
    todoDel:() =>{
        return api.delete('/TodoList/')
    }
    
}