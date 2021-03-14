import { connect } from 'react-redux';
import React, { Component } from 'react'
import {loadProfile, updateProfile, logout} from '../../actions'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            bio: '',
            avatar: ''
        };
    }
    onSubmit = async () => {
        await this.props.updateProfile({
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password,
            bio: this.state.bio
        });
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount = async () => {
        await this.props.loadProfile();
        let {username, email, bio, avatar} = this.props.profile
        this.setState({
            username,
            email,
            password: '*******',
            bio,
            avatar,
        })
    }

    render() {
        let {shared, savedByOthers, id} = this.props.profile
        return (
            <div className='modal'>
                <div className='container'>
                    <h2 className='profileTitle'>Insights</h2>
                    <hr className='profileHr'/>
                    <br/>
                    <div className='container'>
                        <label style={{fontSize: '15px'}}>Your Posts: <b>{shared} </b></label> 
                        <button className={"postview"} onClick={()=> this.props.history.push(`/userProfile/${id}`)}>View Profile</button>
                        <br/>
                        <label style={{fontSize: '15px'}}>Saved By Others: <b>{savedByOthers}</b></label>
                        <br/>
                        <button className="postview" onClick={()=> this.props.history.push('/following-list')}>Following</button>
                        <button className="postview" onClick={()=> this.props.history.push('/followers-list')}>Followers</button>
                    </div>
                    <h2 className='profileTitle'>Edit Profile</h2>
                    <hr className='profileHr'/>
                    <div className="container">
                        <button className="profileAvatar"><i className={`fa fa-${this.state.avatar}`}/></button>
                        <h2 className="profileUser">{this.state.username}</h2> <button className={"logout"} onClick={() => this.props.logout()}>Logout</button><br/>
                        {(()=> {
                            if (this.state.avatar === "shield") {
                                return <p className="profileText"><i className={`fa fa-${this.state.avatar}`}/>: Staff (Ask me for help)</p>
                            } else if (this.state.avatar === "star") {
                                return <p className="profileText"><i className={`fa fa-${this.state.avatar}`}/>: Co-Founder (Started Workout Boost)</p>
                            } else if (this.state.avatar === "heartbeat") {
                                return <p className="profileText"><i className={`fa fa-${this.state.avatar}`}/>: Verified User (trustworthy)</p>
                            } else {
                                return <p className="profileText"><i className={`fa fa-${this.state.avatar}`}/>: Default User</p>
                            }
                        })()}
                        <p className="profileBio">{this.state.bio}</p>
                        <label>Bio:</label>
                        <br/>
                        <textarea
                        className='pBio'
                        wrap='soft'
                        rows='4'
                        cols='50'
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleInputChange}
                        />
                        <br/>
                        <label>Username:</label>
                        <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        />
                        <label>Email:</label>
                        <input
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        />
                        <label>Password:</label>
                        <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        />
                        <br/>
                        <button className='profileSave' onClick={this.onSubmit}>Save</button>
                    </div>
                    <hr className='profileHr'/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {profile: state.profile}
}

export default connect(mapStateToProps, {loadProfile, updateProfile, logout})(Profile)