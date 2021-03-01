import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, deletePost, createComment, deleteComment, addSaved, getUserInfo } from '../../actions';

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
        };
      }
      onSubmit = () => {
        this.props.createPost({
            description: this.state.description, 
        });
      };
    
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }

    componentDidMount = () => {
        this.props.getPost();
        this.props.getUserInfo();
    }

    render() {
        let {posts, auth, history} = this.props
        if (posts.length > 0) {
            return (
                <div>
                    <div>
                        <h3>Post List</h3>
                        <ul>
                            { posts.map(post =>
                            <li key={post._id}>
                                <p>
                                    {post.username}<br/>
                                    {post.description}<br/>
                                    Comments: {
                                        post.comments.length >= 1 ?
                                        post.comments.map(comment =>
                                            <p key={comment._id}>
                                                <br/>
                                                {comment.username}<br/>
                                                {comment.comment}
                                                <button onClick={()=> history.push(`/userProfile/${comment.commentUid}`)}>User</button>
                                                <button 
                                                onClick={()=> this.props.deleteComment(comment.comment, comment.commentUid, comment.postId)} 
                                                style={
                                                    comment.commentUid === auth.userId ? {} : {display: 'none'} &&
                                                    comment.postUid === auth.userId ? {} : {display: 'none'}}>Delete</button>
                                            </p>
                                        )
                                        : <label>No Comments</label>
                                    }
                                </p>
                                <br/>
                                <button onClick={()=> this.props.deletePost(post._id)} style={
                                    post.postUid === auth.userId ? {} : {display: 'none'}}>Delete</button>
                                <button onClick={()=> history.push(`/userProfile/${post.postUid}`)}>User</button>
                                <button onClick={()=> this.props.createComment('Test Comment', post.postUid, post._id)}>Add Test Comment</button>
                                <button onClick={()=> this.props.addSaved(post._id, post.postUid)}>Save</button>
                            </li>
                            )}
                        </ul>
                    </div>
                    <br/>
                    <div>
                        <h3>Create a Post</h3>
                        <input
                        type="description"
                        name="description"
                        placeholder="Enter Description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        required
                        />
                        <button onClick={this.onSubmit}>Post</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>There's no posts to view...</p>
                    <br/>
                    <div>
                        <h3>Create a Post</h3>
                        <input
                        type="description"
                        name="description"
                        placeholder="Enter Description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        required
                        />
                        <button onClick={this.onSubmit}>Post</button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post,
        auth: state.auth
    }
}

export default connect(
  mapStateToProps,
  { createPost, getPost, deletePost, createComment, deleteComment, addSaved, getUserInfo }
)(Post);
