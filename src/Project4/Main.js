import React, { Component } from 'react';
import utils from './utils';
import SingleUser from './SingleUser';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import TodoPostComp from './TodoPostComp';
import NewUserComp from './NewUserComp';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersUrl:'https://jsonplaceholder.typicode.com/users',
            postsUrl:'https://jsonplaceholder.typicode.com/posts',
            todosUrl:'https://jsonplaceholder.typicode.com/todos',
            users: [],
            posts: [],
            todos: [],
            tempSearch: ""
        }
    }

    async componentDidMount(){
        this.props.history.push("/",{isClosing: true})

        let tempUsers = await utils.getAll(this.state.usersUrl);
        let tempPosts = await utils.getAll(this.state.postsUrl);
        let tempTodos = await utils.getAll(this.state.todosUrl);
        await this.setState({
            users: tempUsers.data.slice(0,3),           //sliced to 3 users
            posts: tempPosts.data,
            todos: tempTodos.data
        });

    }

    Search = async (e) => {

        let tempUsers = await utils.getAll(this.state.usersUrl);
        tempUsers = tempUsers.data.slice(0,3);

        let filteredUsers = tempUsers.filter(user =>
            user.name.toUpperCase().includes((e.target.value).toUpperCase())|| 
            user.email.toUpperCase().includes((e.target.value).toUpperCase()))

        this.setState({users: filteredUsers, tempSearch:e.target.value});

    }

    render() {

        let AllUsers = this.state.users.map((user,index) => {
            return (<SingleUser key={index} data={user}/>)})
            
        return (
            <div id = "TotalCssSettings">
                <div className="MainBorder">
                    Search <input type="text" onChange={this.Search}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="Add" onClick={()=>{this.props.history.push("/newuser",{isClosing: true})}}/>
        
                    {AllUsers}
                    
                </div>
                <div id= "MainInfoApp">
                    <Switch>
                        <Route path="/" exact component={''} />
                        <Route path="/todosposts" component={TodoPostComp} />
                        <Route path="/newuser" component={NewUserComp} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);