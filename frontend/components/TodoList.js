import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, td) => {
              if (this.props.showComplete || !td.completed) return acc.concat(
                <div key={td.id} onClick={this.props.toggleCompleted(td.id)}>{td.name}{td.completed ? " ✔️" : ""}</div>
              );
              return acc;
            }, [])
          }
      </div>
    )
  }
}
