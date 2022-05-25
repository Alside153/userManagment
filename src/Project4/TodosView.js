import React, { Component } from 'react';
import utils from './utils'

class TodosView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            todo: this.props.todo,
        }
    }

    markCompleted = async () => {
        let temp = this.state.todo;
        temp.completed = true;
        await this.setState({ todo: temp });
        await utils.updateUser("https://jsonplaceholder.typicode.com/todos", this.state.todo.id, temp);

    }
    render() {
        let isPressed = !(this.state.todo.completed)?  "isVis" : "isNotVis"; 

        return (
            <div>
                Title: <div>{this.state.todo.title}</div>
                Completed: {(this.state.todo.completed.toString().charAt(0).toUpperCase())+((this.state.todo.completed.toString()).slice(1))}
                <div className={isPressed}><input type="button" value="Mark Completed" className="MarkedCompleted" onClick={this.markCompleted} /></div>
            </div>
        );
    }
}

export default TodosView;