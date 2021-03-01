import React from 'react';
import { connect } from 'react-redux';
import { getSaved, deleteSaved, createComment, deleteComment, getUserInfo } from '../../actions';

class Saved extends React.Component {

    componentDidMount = () => {
        this.props.getSaved();
        this.props.getUserInfo();
    }

    render() {
        let {posts, auth, history} = this.props
        if (posts.length > 0) {
            return (
                <div>
                    <div>
                        <h3>Saved Posts</h3>
                        <ul>
                            { posts.map(post =>
                            <li key={post._id}>
                                <p>
                                    {post.username}<br/>
                                    {post.description}<br/>
                                    Comments: {
                                        post.comments.length >= 1 ?
                                        post.comments.map(comment =>
                                            <p>
                                                <br/>
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
                                <button onClick={()=> this.props.deleteSaved(post._id)}>Delete</button>
                                <button onClick={()=> history.push(`/userProfile/${post.postUid}`)}>User</button>
                                <button onClick={()=> this.props.createComment('Test Comment', post.postUid, post._id)}>Add Test Comment</button>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You have no saved posts...</p>
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
  { getSaved, deleteSaved, createComment, deleteComment, getUserInfo }
)(Saved);
