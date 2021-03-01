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
            bio: ''
        };
    }
    onSubmit = async () => {
        await this.props.updateProfile({
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password
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
        let {username, email, bio} = this.props.profile
        this.setState({
            username,
            email,
            password: '*******',
            bio,
        })
    }

    render() {
        let {shared, savedByOthers, id} = this.props.profile
        return (
        <div>
            <h2>Insights</h2>
            <p>Your Posts: {shared}</p>
            <p>Saved By Others: {savedByOthers}</p>
            <button onClick={()=> this.props.history.push(`/userProfile/${id}`)}>View Profile</button>
            <h2>Edit Profile</h2>
            <p>Username:</p>
            <input
            type="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            />
            <p>Email:</p>
            <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            />
            <p>Password:</p>
            <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            />
            <p>Bio:</p>
            <input
            type="bio"
            name="bio"
            value={this.state.bio}
            onChange={this.handleInputChange}
            />
            <br/>
            <button onClick={this.onSubmit}>Save</button>
            <br/>
            <button onClick={()=>this.props.logout()}>Logout</button>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {profile: state.profile}
}

export default connect(mapStateToProps, {loadProfile, updateProfile, logout})(Profile)