import React from 'react';
import { connect } from 'react-redux';
import { getUsersPosts, getUserInfo, createComment, deleteComment, addSaved } from '../../actions';

class UserProfile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getUsersPosts(id);
    this.props.getUserInfo();
  }

  render() {
      let {posts, auth, history} = this.props;
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
                        <button onClick={()=> this.props.createComment('Test Comment', post.postUid, post._id)}>Add Test Comment</button>
                        <button onClick={()=> this.props.addSaved(post._id)}>Save</button>
                    </li>
                    )}
                </ul>
            </div>
        </div>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
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
};

export default connect(
  mapStateToProps,
  { getUsersPosts, getUserInfo, createComment, deleteComment, addSaved }
)(UserProfile);