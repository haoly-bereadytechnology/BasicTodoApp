document.addEventListener('alpine:init', () => {
  console.log("Alpine is initializing..."); 
    // Alpine.plugin(AlpinePersist);
    // Alpine.plugin(window.AlpinePersist);
  
    Alpine.data('todoApp', () => ({
      // 
      listTodo: Alpine.$persist([]).as('listTodo'),
      newTodo: '',
      state: Alpine.$persist({total: 0, completed: 0, filter:'all' }).as('state'),
      addTask(){
        if(this.newTodo.trim() != ''){
          // this.listTodo.push({id:Date.now(), text: this.newTodo, completed:false});
          this.listTodo = [...this.listTodo, {id:Date.now(), text: this.newTodo, completed:false}];
          this.newTodo = '';
          this.taskCounts();
        }
      },
      removeTask(id){
        this.listTodo = this.listTodo.filter(task => task.id != id)
        this.taskCounts();
      },
      taskCounts(){
        this.state.total = this.listTodo.length;
        this.state.completed = this.listTodo.filter(task => task.completed === true).length;
      },
      filterTask(){
        if(this.state.filter === 'completed'){
          return this.listTodo.filter(task => task.completed === true);
        }
        if (this.state.filter === 'uncompleted') {
          return this.listTodo.filter(task => task.completed === false);
        }
        return this.listTodo;
      },
    }))
});
