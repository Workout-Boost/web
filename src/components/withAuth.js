import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../actions/api'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      api.get('checkToken', {
        params: {token: cookies.get('token')}
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            console.log(res.error)
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}