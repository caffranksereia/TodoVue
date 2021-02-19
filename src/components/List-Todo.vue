<template>
 <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
    <!-- App title section -->
        <div class="row m-1 p-4">
            <div class="col">
                <div class="p-1 h1 text-primary text-center mx-auto display-inline-block">
                    <u>Lista de TODO</u>
                </div>
            </div>
        </div>
    <!-- Create todo section -->
        <div class="row m-1 p-3">
            <div class="col col-11 mx-auto">
                <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                    <div class="col">
                        <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." v-model="todo.Tarefa">
                    </div>
                    <div class="col-auto m-0 px-2 d-flex align-items-center">
                        <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                        <i class="fa fa-calendar my-2 px-1 text-primary btn due-date-button" data-toggle="tooltip" data-placement="bottom" title="Set a Due date"></i>
                        <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                    </div>
                    <div class="col-auto px-0 mx-0 mr-2">
                        <button type="button" class="btn btn-primary" @click="Adicionar">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-todo">
        <b-form-group>
            <b-list-group>
                <b-list-group-item v-for="todo of todo" :key="todo.Tarefa" class="todo-items">
                    {{ todo.id }} - {{ todo.Tarefa }}
                    <div class="row m-1 p-3">
                        <div style="display: flex;right:200px">
                            <b-button pill variant="danger" @click="confirmDel">Excluir</b-button>
                        </div>
                        <div class="col-auto px-0 mx-0 mr-2">
                            <b-button pill variant="primary" @click="confirmDon">Concluir</b-button>
                        </div>
                    </div>
                   
                </b-list-group-item>
            </b-list-group>
        </b-form-group>
    </div>
    
</div>
</template>
<script>
import Todo from '@/Service/Todo';

export default {
    data(){
        return{
            id: Number,
            newTodo: String,
            
            todo:[]
        }

    },
    methods:{
        
        Adicionar(){
            Todo.todoPost({
                id:this.todo.id,
                Tarefa:this.todo.newTodo
            })
            this.idForTodo++,
            this.todo.Tarefa
            
        },
        confirmDel(){
            Todo.todoDel({
                id:this.todo.id
            })

        },
        confirmDon(){

        }
    },
    mounted(){
        Todo.todoList().then(res =>{
            this.todo = res.data
        })
    }
}
</script>
<style scoped>
body {
    font-family: "Open Sans", sans-serif;
    line-height: 1.6;
}

.add-todo-input,
.edit-todo-input {
    outline: none;
}

.add-todo-input:focus,
.edit-todo-input:focus {
    border: none !important;
    box-shadow: none !important;
}

.view-opt-label,
.date-label {
    font-size: 0.8rem;
}

.edit-todo-input {
    font-size: 1.7rem !important;
}

.todo-actions {
    visibility: hidden !important;
}

.todo-item:hover .todo-actions {
    visibility: visible !important;
}

.todo-item.editing .todo-actions .edit-icon {
    display: none !important;
}

</style>