import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.handleSubmit}>
            <input 
              value={this.props.todoNameInput} 
              onChange={this.props.handleInputChange} 
              type="text" 
              placeholder="Type todo">
            </input>
            <input type="submit"></input>
        </form>
          <button 
            onClick={this.props.toggleDisplayComplete}
          >
            {this.props.showComplete ? 'Hide' : 'Show'} Completed
          </button>
      </>
    )
  }
}
