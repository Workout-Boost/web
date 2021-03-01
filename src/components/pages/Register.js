import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  onSubmit = () => {
    this.props.register({
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

  render() {
    return (
      <div>
        <h3>Register below!</h3>
        <input
        name="username"
        placeholder="Enter Username"
        value={this.state.username}
        onChange={this.handleInputChange}
        required
        />
        <input
        name="email"
        placeholder="Enter Email"
        value={this.state.email}
        onChange={this.handleInputChange}
        required
        />
        <input
        name="password"
        placeholder="Enter Password"
        value={this.state.password}
        onChange={this.handleInputChange}
        required
        />
        <button onClick={this.onSubmit}>Register</button>
      </div>
    )
  }
}

export default connect(
  null,
  { register }
)(Register);
