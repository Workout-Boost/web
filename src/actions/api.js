import axios from 'axios';
import Cookies from 'universal-cookie';
import jsCookies from 'js-cookie';
const cookies = new Cookies();

// This makes it so we can use shortened url with api calls
export default axios.create({
  baseURL: `https://workoutboostapi.herokuapp.com/`,
  withCredentials: true,
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  params: {
    token: cookies.get('token') || jsCookies.get('token')
  }
});