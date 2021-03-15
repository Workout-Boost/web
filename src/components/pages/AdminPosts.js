import React from 'react';
import { connect } from 'react-redux';
import { adminGetPost, adminDeletePost, adminDeleteComment } from '../../actions';
import "../styles/Posts.css"

class Home extends React.Component {

    onDeleteComment = async (comment, commentUid, postId) => {
        this.props.adminDeleteComment(comment, commentUid, postId)
        await this.props.adminGetPost();
    }

    componentDidMount = () => {
        this.props.adminGetPost();
    }

    render() {
        let {posts} = this.props
        console.log(posts)
        if (posts.length > 0) {
            return (
                <div className="postContainer">
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="dropdown">
                            <button onClick={()=> this.props.history.push('/admin/users')}>Users Admin</button>
                            <button className={"dropbtn"}><i className={"fa fa-user"}/> Admin</button>
                        </div>
                    </div>
                    { posts.map(post =>
                    <div key={post._id}>
                        <hr style={{borderTop: "2px solid #a0a0a0"}} />
                        <button className="postAvatar"><i class="fa fa-bolt"></i></button>
                        <b className="postUser">{post.username}</b>
                        <button className="postDelete" onClick={()=> this.props.adminDeletePost(post._id)}><i class="fa fa-trash"></i></button>
                        <div className="postDesc" dangerouslySetInnerHTML={{ __html: post.description }} />
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={post.image} className={post.image ? "postImage" : "hide"}/><br/>
                        </div>
                        {
                            post.comments.length >= 1 ?
                            post.comments.map(comment =>
                                <p key={comment._id}>
                                    <br/>
                                    <b>{comment.username}: </b> 
                                    <span className="commentText">{comment.comment}</span>
                                    <button className="commentDelete"
                                    onClick={()=> this.onDeleteComment(comment.comment, comment.commentUid, comment.postId)} 
                                    ><i class="fa fa-trash"></i></button>
                                </p>
                            )
                            : <p></p>
                        }
                        <br/>
                    </div>
                    )}
                </div>
            )
        } else {
            return (
                <p>You are not authorized: email admin@workoutboost.net if you would like to be staff</p>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post
    }
}

export default connect(
  mapStateToProps,
  { adminGetPost, adminDeleteComment, adminDeletePost }
)(Home);