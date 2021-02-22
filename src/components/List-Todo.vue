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
        <div class="row m-1 p-3" >
            <div class="col col-11 mx-auto">
                <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                    <div class="col">
                        <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." v-model="newTodo" @keyup.enter="Adicionar">
                    </div>
                </div>
            </div>
        </div>
        <div class="list-todo">
        <b-form-group>
            <b-list-group>
                <b-list-group-item v-for="(todo,index) in todo" :key="todo.id" :todo="todo" >
                    {{ todo.id }} - {{ todo.newTodo }} - {{ doneSucess }} - {{ index }}
                    <b-container class="bv-example-row">
                        <b-row>
                            <ul v-if="doneSucess">
                                 <b-form-checkbox size="sm" @click="feito()" :checked="todo.doneSucess">Feito</b-form-checkbox>
                                
                                
                            </ul>
                           
                        </b-row>
                    </b-container>
                    <div class="row m-1 p-3">
                        
                            
                        
                        <div style="display: flex;right:200px">
                            <b-button pill variant="danger" @click="onOpenDelete()"
                            >
                                Excluir</b-button>
                            <dialog-delete />
                        </div>
                        <div class="col-auto px-0 mx-0 mr-2">
                            <b-button pill variant="primary" v-on:click="Editar()">Editar</b-button>
                           
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
            
                id:'',
                newTodo:'',
                doneSucess:true,
               
                eddit:null,
                edditId:0,
            
            
            todo:[],
            openDialog:false
        }

    },
    methods:{   
        List(){
            Todo.todoList().then(res =>{
                this.todo = res.data
                console.log(res.data)
            })
        },
        Adicionar(){
            var data = {
                newTodo:this.newTodo,
                eddit:this.eddit,
                edditId:this.edditId,
                done:this.done
            }
            if(this.newTodo.trim() !==""){
                if(this.eddit)
                {
                    this.todo[this.edditId] = this.newTodo,
                    this.infoTodo.newTodo = "",
                    this.eddit = false
                    console.log(data)
                    Todo.todoSave(data)
                    this.List();
                    alert('atualizado')
                    this.newTodo = ''
               
                }else{
                    this.todo.push(this.newTodo),

                    console.log(data)
                    Todo.todoSave(data)
                    this.List();
                    alert('Salvo')
                    this.newTodo = ''
                
                }
            }
        },
            onOpenDelete(index) {
                this.todo.splice(index,1)
            },
            Editar(index){
                this.newTodo = this.todo[index],
                this.eddit = true,
                this.edditId = index
            },
            Feito(todo){
                todo.doneSucess = true
                
                
            }
        },
    mounted(){
        this.List()
    },
    computed:{
        checkTodos(){
            return this.todo.filter(x => x.done)
        }
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