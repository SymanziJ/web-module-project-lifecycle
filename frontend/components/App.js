import React from 'react';
import axios from "axios";
import Form from "./Form";
import TodoList from "./TodoList"

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      showComplete: true
    }
  }

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      todoNameInput: value
    })
  }

  resetFormInput = () => {
    this.setState({
      ...this.state,
      todoNameInput: ''
    })
  }

  handleAxiosErrorMSG = (err) => {
    this.setState({
      ...this.state,
      error: err.response.data.message
    })
  }


  handlePost = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        console.log(res);
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)});
        this.resetFormInput();
      })
      .catch(this.handleAxiosErrorMSG)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form");
    this.handlePost();
  }

  fetchAllTodos = (todosState) => {
    console.log("fetching", todosState);
    axios.get(URL)
    .then(res => {
      console.log(res.data);
      this.setState({
        ...this.state,
        todos: res.data.data
      })
    })
    .catch(this.handleAxiosErrorMSG)
  }

  toggleCompleted = id => e => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map(td => {
            if (td.id !== id) return td;
            return res.data.data
          })
        })
      })
      .catch(this.handleAxiosErrorMSG)
  }

  toggleDisplayComplete = () => {
    this.setState({
      ...this.state,
      showComplete: !this.state.showComplete
    })
  }

  componentDidMount() {
    this.fetchAllTodos(this.state.todos);
  }

  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <TodoList 
          todos = {this.state.todos}
          showComplete = {this.state.showComplete}
          toggleCompleted = {this.toggleCompleted}
        />
        <Form 
          handleSubmit = {this.handleSubmit}
          todoNameInput = {this.state.todoNameInput}
          handleInputChange = {this.handleInputChange}
          toggleDisplayComplete = {this.toggleDisplayComplete}
          showComplete = {this.state.showComplete}
        />
      </div>
    )
  }
}
