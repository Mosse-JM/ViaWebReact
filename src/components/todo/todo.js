import React, {Component} from 'react'
import './todo.scss';
import axios from 'axios'
import TodoItem from './Todoitem'
import AddTodo from './AddTodo'
import PropTypes from 'prop-types'



class Todo extends Component{
    state = {
        todos: []
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => this.setState ({todos:res.data})) 
    }

    markComplete = (id) =>{
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo;
            })
        })
    }
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({
                todos: [...this.state.todos.filter(todo => todo.id !== id)]
            }))
        
    }

    addTodo = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed:false 
        })
        .then(res => this.setState({todos:[...this.state.todos, res.data]}) )
        
    }

    render(){
        return([
            <div id="todo">
                <AddTodo addTodo={this.addTodo}/>
            </div>,

            this.state.todos.map((todo) => 
                <TodoItem key={todo.id} todo={todo} markComplete={this.markComplete} 
                delTodo={this.delTodo}/>
            )
           
        ])   
        
    }
}

Todo.propTypes = {
    todos: PropTypes.array,
    markComplete: PropTypes.func,
    delTodo: PropTypes.func,
}
 export default Todo