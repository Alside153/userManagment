import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SingleUser.css';
import utils from './utils';

class NewUserComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
        }
    }

    AddNewUser = async () => {
        if(this.state.email.length>0 && this.state.name.length>0){
            let tempUser = {
                name:this.state.name,
                email:this.state.email,
            }

            await utils.addUser("https://jsonplaceholder.typicode.com/users", tempUser)

            console.log("Added: ", tempUser.name)
            this.props.history.push("/",{isClosing: true})
        }
    }
    render() {
        return (
            <div className="WholeInfoAdded">
                Add New User
                <div id="NewUserInfoAdd">
                    Name: <input type="text" onChange={async (e)=>{ await this.setState({name: e.target.value})}}/><br/><br/>
                    Email: <input type="text" onChange={async (e)=>{ await this.setState({email: e.target.value})}}/><br/><br/>

                    <input type="button" value="Cancel" onClick={()=>{this.props.history.push("/",{isClosing: true})}}/>
                    <input type="button" value="Add" onClick={this.AddNewUser}/>
                </div>
            </div>
        );
    }
}

export default withRouter(NewUserComp);