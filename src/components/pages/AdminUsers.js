import { connect } from 'react-redux';
import React, { Component } from 'react'
import {adminGetUsers, adminDeleteUser, adminUpdateProfile} from '../../actions'

class AdminUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: {},
            email: {},
            password: {},
            avatar: {},
            verified: {}
        };
    }
    
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.props.adminGetUsers();
    }
    render() {
        let {admin} = this.props
        if (admin.length > 0) {
            return (
                <div>
                    <h3>Users List</h3>
                    <p>
                        Avatar List<br/>
                        Shield (Staff)<br/>
                        Heartbeat (Verified)<br/>
                        Bolt (Default)<br/>
                    </p>
                    <ul>
                        { admin.map(user =>
                        <li key={user._id}>
                            <input
                            name="username"
                            placeholder={user.username}
                            value={this.state.username[user._id]}
                            onChange={e => {
                                this.setState({username: Object.assign(this.state.username, {[user._id]: e.target.value})})
                            }}
                            required
                            /><br/>
                            <button onClick={()=> this.props.adminUpdateProfile("username", this.state.username[user._id], user._id)}>Update Username</button>
                            <input
                            name="email"
                            placeholder={user.email}
                            value={this.state.email[user._id]}
                            onChange={e => {
                                this.setState({email: Object.assign(this.state.email, {[user._id]: e.target.value})})
                            }}
                            required
                            /><br/>
                            <button onClick={()=> this.props.adminUpdateProfile("email", this.state.email[user._id], user._id)}>Update Email</button>
                            <input
                            name="password"
                            placeholder={user.password}
                            value={this.state.password[user._id]}
                            onChange={e => {
                                this.setState({password: Object.assign(this.state.password, {[user._id]: e.target.value})})
                            }}
                            required
                            /><br/>
                            <button onClick={()=> this.props.adminUpdateProfile("password", this.state.password[user._id], user._id)}>Update Password</button>
                            <input
                            name="avatar"
                            placeholder={user.avatar}
                            value={this.state.avatar[user._id]}
                            onChange={e => {
                                this.setState({avatar: Object.assign(this.state.avatar, {[user._id]: e.target.value})})
                            }}
                            required
                            /><br/>
                            <button onClick={()=> this.props.adminUpdateProfile("avatar", this.state.avatar[user._id], user._id)}>Update Avatar</button>
                            <input
                            name="verified"
                            placeholder={user.isVerified ? "true" : "false"}
                            value={this.state.verified[user._id]}
                            onChange={e => {
                                this.setState({verified: Object.assign(this.state.verified, {[user._id]: e.target.value})})
                            }}
                            required
                            /><br/>
                            <button onClick={()=> this.props.adminUpdateProfile("verified", this.state.verified[user._id], user._id)}>Update Verification</button>
                            <br/>
                            <button onClick={()=> this.props.adminDeleteUser(user._id)}>Delete User</button>
                        </li>
                        )}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You are not authorized: email admin@workoutboost.net if you would like to be staff</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {admin: state.admin}
}

export default connect(mapStateToProps, {adminGetUsers, adminDeleteUser, adminUpdateProfile})(AdminUsers)