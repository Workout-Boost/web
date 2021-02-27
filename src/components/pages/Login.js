import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions';

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
      <div>
        <h3>Login below!</h3>
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
        <button onClick={this.onSubmit}>Login</button>
      </div>
    )
  }
}

export default connect(
  null,
  { login }
)(Login);
