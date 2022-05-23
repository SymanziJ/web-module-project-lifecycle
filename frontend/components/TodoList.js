import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, td) => {
              if (this.props.showComplete || !td.completed) return acc.concat(
                <Todo 
                  key={td.id} 
                  todo = {td}
                  toggleCompleted = {this.props.toggleCompleted}
                />
              );
              return acc;
            }, [])
          }
      </div>
    )
  }
}
