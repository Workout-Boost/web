import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, deletePost, getCategory, createComment, deleteComment, addSaved, getUserInfo } from '../../actions';

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            comment: {}
        };
    }

    onSubmit = () => {
        this.props.createPost({
            description: this.state.description
        });
        this.setState({
            description: ''
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
        if (posts.length > 0 && auth) {
            return (
                <div>
                    <div>
                        <button onClick={()=> this.props.getPost()}>All</button>
                        <button onClick={()=> this.props.getCategory('Upper')}>Upper</button>
                        <button onClick={()=> this.props.getCategory('Lower')}>Lower</button>
                        <button onClick={()=> this.props.getCategory('Nutrition')}>Nutrition</button>
                        <h3>Post List</h3>
                            { posts.map(post =>
                            <div key={post._id}>
                                <div>
                                    <button onClick={()=> this.props.deletePost(post._id)} style={
                                        post.postUid === auth.userId ? {} : {display: 'none'}}>Delete</button>
                                    <b onClick={()=> history.push(`/userProfile/${post.postUid}`)}>{post.username}</b>
                                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                                    <img src={post.image} style={post.image ? {width:"250px", height:"150px"} : {display:'none'}}/><br/>
                                    {
                                        post.comments.length >= 1 ?
                                        post.comments.map(comment =>
                                            <p key={comment._id}>
                                                Comments:
                                                <br/>
                                                <b onClick={()=> history.push(`/userProfile/${comment.commentUid}`)}>{comment.username}:</b> {comment.comment}
                                                <button 
                                                onClick={()=> this.props.deleteComment(comment.comment, comment.commentUid, comment.postId)} 
                                                style={
                                                    comment.commentUid === auth.userId ? {} : {display: 'none'} &&
                                                    comment.postUid === auth.userId ? {} : {display: 'none'}}>Delete</button>
                                            </p>
                                        )
                                        : <p></p>
                                    }
                                </div>
                                <br/>
                                <input
                                name="comment"
                                placeholder="Add a comment..."
                                value={this.state.comment[post._id]}
                                onChange={e => {
                                    this.setState({comment: Object.assign(this.state.comment, {[post._id]: e.target.value})})
                                }}
                                required
                                />
                                <button onClick={async ()=> {
                                    await this.props.createComment(this.state.comment[post._id], post.postUid, post._id)
                                    this.setState({comment: Object.assign(this.state.comment, {[post._id]: ''})})
                                    }}>Add</button>
                                <button onClick={()=> this.props.addSaved(post._id, post.postUid)}>Save</button>
                            </div>
                            )}
                    </div>
                    <br/>
                    <div>
                        <h3>Create a Post</h3>
                        <input
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
  { createPost, getPost, deletePost, getCategory, createComment, deleteComment, addSaved, getUserInfo }
)(Post);
