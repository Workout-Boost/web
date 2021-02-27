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
        };
    }
    onSubmit = async () => {
        await this.props.updateProfile({
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password
        });
        this.props.loadProfile()
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount = () => {
        this.props.loadProfile();
    }

    render() {
        return (
        <div>
            <h3>Email: {this.props.profile.email}</h3>
            <h3>Hashed Password: {this.props.profile.password}</h3>
            <h2>Update Profile below</h2>
            <input
            type="username"
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
            />
            <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />
            <button onClick={this.onSubmit}>Update</button>
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