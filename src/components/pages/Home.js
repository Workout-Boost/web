import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, deletePost, getKeyword, createComment, deleteComment, addSaved, getUserInfo } from '../../actions';
import "../styles/Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            comment: {},
            keyword: ''
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
                        <div>
                            <button className="postAvatar" onClick={()=> history.push(`/userProfile/${post.postUid}`)}><i class="fa fa-bolt"></i></button>
                            <b className="postTitle" onClick={()=> history.push(`/userProfile/${post.postUid}`)}>{post.username}</b>
                            <button className="postDelete" onClick={()=> this.props.deletePost(post._id)} style={
                                post.postUid === auth.userId ? {} : {display: 'none'}}><i class="fa fa-trash"></i></button>
                            <div className="postDesc" dangerouslySetInnerHTML={{ __html: post.description }} />
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={post.image} style={post.image ? {maxWidth:"300px", maxHeight:"250px", borderRadius:"7px", padding: '4px', backgroundColor:'grey'} : {display:'none'}}/><br/>
                            </div>
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
                        <br/><br/>
                        <hr style={{top: "10.39px", position: "relative", marginTop: "-15px", borderTop: "2px solid #a0a0a0"}}/>
                    </div>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={()=> this.props.getPost()}>All</button>
                    <button onClick={()=> this.props.getKeyword('Upper')}>Upper</button>
                    <button onClick={()=> this.props.getKeyword('Lower')}>Lower</button>
                    <button onClick={()=> this.props.getKeyword('Nutrition')}>Nutrition</button>
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
                    <p>There's no posts to view...</p>
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
  { createPost, getPost, deletePost, getKeyword, createComment, deleteComment, addSaved, getUserInfo }
)(Home);