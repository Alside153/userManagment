import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TodosView from './TodosView'
import utils from './utils'

class TodoPostComp extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            postsUrl: 'https://jsonplaceholder.typicode.com/posts',
            todosUrl: 'https://jsonplaceholder.typicode.com/todos',
            posts: [],
            todos: [],
            AddingTodo: false,
            AddingPost: false,
            TempTodoInfo: "",
            TempPostInfo: "",
            TempPostBody: "",
        }
    }

    async componentDidMount() {
        let tempPosts = await utils.getAll(this.state.postsUrl);
        let tempTodos = await utils.getAll(this.state.todosUrl);

        tempPosts = (tempPosts.data).filter(post => post.userId === this.state.id)
        tempTodos = (tempTodos.data).filter(todo => todo.userId === this.state.id)
        tempPosts = tempPosts.slice(0, 3)
        tempTodos = tempTodos.slice(0, 3)


        await this.setState({
            posts: tempPosts,
            todos: tempTodos
        });
    }

    addNewTodo = async () => {
        let tempTodo = {
            title: this.state.TempTodoInfo,
            userId: this.state.id,
            completed: false,
        }
        let tempTodos = this.state.todos
        tempTodos.push(tempTodo)
        await this.setState({ todos: tempTodos })
        await utils.addUser(this.state.todosUrl, tempTodo)
        await this.setState({ AddingTodo: false })
    }

    addNewPost = async() => {
        let tempPost = {
            title: this.state.TempPostInfo,
            body: this.state.TempPostBody,
            userId: this.state.id,
            
        }
        let tempPosts = this.state.posts
        tempPosts.push(tempPost)
        await this.setState({ posts: tempPosts })
        
        // await utils.addUser(this.state.postsUrl, tempPost)
        await this.setState({ AddingPost: false })
    }

    render() {
        let todo = this.state.todos.map((todo, index) => {
            return (
                <div className="smallInfoContainer" key={index}>
                    <TodosView id={this.state.id} todo={todo} />
                </div>
            )
        })
        let post = this.state.posts.map((post, index) => {
            return (
                <div className="smallInfoContainer" key={index}>
                    Title: <div>{post.title}</div><br/>
                    Body: <div>{post.body}</div>
                </div>
            )
        })
        let ToAddTodo = this.state.AddingTodo ? "isNotVis" : "isVis";
        let ToAddTodoSection = this.state.AddingTodo ? "InfoContainer isVis" : "isNotVis";

        let ToAddPost = this.state.AddingPost ? "isNotVis" : "isVis";
        let ToAddPostSection = this.state.AddingPost ? "InfoContainer isVis" : "isNotVis";

        return (
            <div className="WholeInfoAdded">
                <div className={ToAddTodo}>
                <div onClick={()=>{this.props.history.push("/",{isClosing: true})}}>X</div><br/>
                    Todos-User {this.state.id} 
                    <input type="button" value="Add" className="AddButtonInfo" onClick={async () => { this.setState({ AddingTodo: true }) }} />
                    <div className="InfoContainer">
                        {todo}
                    </div>
                </div>

                <div className={ToAddTodoSection}>
                    <br />
                    <div>
                        Title: <input type="text" onChange={async (e) => { await this.setState({ TempTodoInfo: e.target.value }) }} />
                    </div>
                    <br />
                    <div className="AddButtonInfo">
                        <input type="button" onClick={() => { this.setState({ AddingTodo: false }) }} value="Cancel" />
                        &nbsp;&nbsp;
                        <input type="button" onClick={this.addNewTodo} value="Add" />
                    </div>
                </div>

                <br />

                <div className={ToAddPost}>
                    Posts-User {this.state.id}
                    <input type="button" value="Add" className="AddButtonInfo" onClick={async () => { this.setState({ AddingPost: true }) }} />

                    <div className="InfoContainer">
                        {post}
                    </div>
                </div>

                <div className={ToAddPostSection}>
                    <br />
                    <div>
                        Title: <input type="text" onChange={async (e) => { await this.setState({ TempPostInfo: e.target.value }) }} /> <br/><br/>
                        Body: <input type="text" onChange={async (e) => { await this.setState({ TempPostBody: e.target.value }) }} />
                    </div>
                    <br />
                    <div className="AddButtonInfo">
                        <input type="button" onClick={() => { this.setState({ AddingPost: false }) }} value="Cancel" />
                        &nbsp;&nbsp;
                        <input type="button" onClick={this.addNewPost} value="Add" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TodoPostComp);