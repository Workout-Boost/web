import React from 'react';
import { connect } from 'react-redux';
import { getUsersPosts, getUserInfo, deletePost, createComment, deleteComment, addSaved } from '../../actions';
import "../styles/Posts.css"

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {}
        };
    }

    onCreateComment = async (comment, postUid, id) => {
        await this.props.createComment(comment, postUid, id)
        await this.props.getUsersPosts(this.props.match.params.id);
        this.setState({comment: Object.assign(this.state.comment, {[id]: ''})})
    }

    onDeleteComment = async (comment, commentUid, postId) => {
        await this.props.deleteComment(comment, commentUid, postId)
        await this.props.getUsersPosts(this.props.match.params.id);
    }

    componentDidMount() {
        this.props.getUsersPosts(this.props.match.params.id);
        this.props.getUserInfo();
    }

    render() {
        let {posts, auth, history} = this.props
        if (posts.post) {
            return (
                <div className="postContainer">
                    <button className="userProfileAvatar"><i className={`fa fa-${posts.avatar}`}/></button>
                    <h2 className="userProfileUser">{posts.username}</h2><br/>
                    {(()=> {
                        if (posts.avatar === "shield") {
                            return <p className="userProfileText"><i className={`fa fa-${posts.avatar}`}/>: Staff (Ask me for help)</p>
                        } else if (posts.avatar === "star") {
                            return <p className="userProfileText"><i className={`fa fa-${posts.avatar}`}/>: Co-Founder (Started Workout Boost)</p>
                        } else if (posts.avatar === "heartbeat") {
                            return <p className="userProfileText"><i className={`fa fa-${posts.avatar}`}/>: Verified User (trustworthy)</p>
                        } else {
                            return <p className="userProfileText"><i className={`fa fa-${posts.avatar}`}/>: Default User</p>
                        }
                    })()}
                    <p className="userProfileBio">{posts.bio}</p>
                    { posts.post.map(post =>
                    <div key={post._id}>
                        <hr style={{borderTop: "2px solid #a0a0a0"}} />
                        <button className="postAvatar" onClick={()=> history.push(`/userProfile/${post.postUid}`)}><i className={`fa fa-${post.avatar}`}/></button>
                        <b className="postUser" onClick={()=> history.push(`/userProfile/${post.postUid}`)}>{post.username}</b>
                        <button className="postDelete" onClick={()=> this.props.deletePost(post._id)} style={
                            post.postUid === auth.userId ? {} : {display: 'none'}}><i class="fa fa-trash"></i></button>
                        <button className="postSave" onClick={()=> this.props.addSaved(post._id, post.postUid)}><i className="fa fa-bookmark"></i></button>
                        <div className="postDesc" dangerouslySetInnerHTML={{ __html: post.description }} />
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={post.image} className={post.image ? "postImage" : "hide"}/><br/>
                        </div>
                        {
                            post.comments.length >= 1 ?
                            post.comments.map(comment =>
                                <p key={comment._id}>
                                    <br/>
                                    <b className="commentUser" onClick={()=> history.push(`/userProfile/${comment.commentUid}`)}>{comment.username}: </b> 
                                    <span className="commentText">{comment.comment}</span>
                                    <button className="commentDelete"
                                    onClick={()=> this.onDeleteComment(comment.comment, comment.commentUid, comment.postId)} 
                                    style={
                                        comment.commentUid === auth.userId ? {} : {display: 'none'} &&
                                        comment.postUid === auth.userId ? {} : {display: 'none'}}><i className="fa fa-trash"></i></button>
                                </p>
                            )
                            : <p></p>
                        }
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <input
                            name="comment"
                            placeholder="Add a comment..."
                            value={this.state.comment[post._id]}
                            onChange={e => {
                                this.setState({comment: Object.assign(this.state.comment, {[post._id]: e.target.value})})
                            }}
                            required
                            />
                            <button className="add" onClick={async ()=> {
                                await this.onCreateComment(this.state.comment[post._id], post.postUid, post._id)
                                this.setState({comment: Object.assign(this.state.comment, {[post._id]: ''})})
                                }}>Add</button>
                        </div>
                        <br/><br/>
                        <hr style={{top: "3px", position: "relative", marginTop: "-15px", borderTop: "2px solid #a0a0a0"}}/>
                    </div>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{fontSize:"20px", textAlign:"center"}}>404: No user found</p>
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
};

export default connect(
  mapStateToProps,
  { getUsersPosts, getUserInfo, deletePost, createComment, deleteComment, addSaved }
)(UserProfile);