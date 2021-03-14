import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions';
import avatar from '../assets/avatarimage.jpg'
import "../styles/Auth.css"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    };
  }
  onSubmit = () => {
    this.props.login({
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

  render() {
    return (
      <div className="modal">
        <div className="imgcontainer">
            <img src={avatar} alt="Avatar" className="avatar"/>
        </div>
        <div className="container">
          <label>Email</label>
          <input
          name="email"
          placeholder="Enter Email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
          />
          <label>Password</label>
          <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          />
          <button className="system" onClick={this.onSubmit}>Login</button>
        </div>
        <div className="container">
            <button className='forgotpass' onClick={()=> this.props.history.push('/forgot-password')}>Forgot Password?</button>
            <span className="register">Don't have account? <button className="registerbtn" onClick={()=>this.props.history.push('/register')}>Register</button></span>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { login }
)(Login);
