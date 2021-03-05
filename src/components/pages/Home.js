import React from 'react';
import { connect } from 'react-redux';
import { getPost, deletePost, getKeyword, createComment, deleteComment, addSaved, getUserInfo } from '../../actions';
import "../styles/Posts.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {},
            keyword: ''
        };
    }
    
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onCreateComment = async (comment, postUid, id) => {
        this.props.createComment(comment, postUid, id)
        await this.props.getPost();
        this.setState({comment: Object.assign(this.state.comment, {[id]: ''})})
    }

    onDeleteComment = async (comment, commentUid, postId) => {
        this.props.deleteComment(comment, commentUid, postId)
        await this.props.getPost();
    }

    componentDidMount = () => {
        this.props.getPost();
        this.props.getUserInfo();
    }

    render() {
        let {posts, auth, history} = this.props
        if (posts.length > 0) {
            return (
                <div className="postContainer">
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="dropdown">
                            <button className={"dropbtn"}><i className={"fa fa-search"}/> Categories <i className={"fa fa-caret-down"}/></button>
                            <div className={"dropdown-content"}>
                                <button onClick={()=> this.props.getPost()}>All</button>
                                <button onClick={()=> this.props.getKeyword('Upper')}>Upper</button>
                                <button onClick={()=> this.props.getKeyword('Lower')}>Lower</button>
                                <button onClick={()=> this.props.getKeyword('Nutrition')}>Nutrition</button>
                            </div>
                        </div>
                        <input
                        name="keyword"
                        placeholder="Keyword Search..."
                        value={this.state.keyword}
                        onChange={async e => {
                            await this.setState({keyword: e.target.value})
                            this.props.getKeyword(this.state.keyword)
                        }}
                        required
                        />
                    </div>
                    { posts.map(post =>
                    <div key={post._id}>
                        <hr style={{borderTop: "2px solid #a0a0a0"}} />
                        <button className="postAvatar" onClick={()=> history.push(`/userProfile/${post.postUid}`)}><i class="fa fa-bolt"></i></button>
                        <b className="postUser" onClick={()=> history.push(`/userProfile/${post.postUid}`)}>{post.username}</b>
                        <button className="postDelete" onClick={()=> this.props.deletePost(post._id)} style={
                            post.postUid === auth.userId ? {} : {display: 'none'}}><i class="fa fa-trash"></i></button>
                        <button className="postSave" onClick={()=> this.props.addSaved(post._id, post.postUid)}><i class="fa fa-bookmark"></i></button>
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
                                        comment.postUid === auth.userId ? {} : {display: 'none'}}><i class="fa fa-trash"></i></button>
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
                        <hr style={{top: "10.39px", position: "relative", marginTop: "-15px", borderTop: "2px solid #a0a0a0"}}/>
                    </div>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="dropdown">
                            <button className={"dropbtn"}><i className={"fa fa-search"}/> Categories <i className={"fa fa-caret-down"}/></button>
                            <div className={"dropdown-content"}>
                                <button onClick={()=> this.props.getPost()}>All</button>
                                <button onClick={()=> this.props.getKeyword('Upper')}>Upper</button>
                                <button onClick={()=> this.props.getKeyword('Lower')}>Lower</button>
                                <button onClick={()=> this.props.getKeyword('Nutrition')}>Nutrition</button>
                            </div>
                        </div>
                        <input
                        name="keyword"
                        placeholder="Keyword Search..."
                        value={this.state.keyword}
                        onChange={async e => {
                            await this.setState({keyword: e.target.value})
                            this.props.getKeyword(this.state.keyword)
                        }}
                        required
                        />
                    </div>
                    <p style={{fontSize:"20px", textAlign:"center"}}>There's no posts to view...</p>
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
  { getPost, deletePost, getKeyword, createComment, deleteComment, addSaved, getUserInfo }
)(Home);