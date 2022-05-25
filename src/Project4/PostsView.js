import React, { Component } from 'react';

class PostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            post: this.props.post,
        }
    }

    render() {
        return (
            <div>
                Title: <div>{this.state.post.title}</div><br/>
                body: <div>{this.state.post.body}</div>
            </div>
        );
    }
}

export default PostsView;