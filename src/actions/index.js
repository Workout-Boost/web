import history from '../history'
import api from './api'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {
    WELCOME_MESSAGE,
    LOAD_PROFILE,
    GET_POST,
    GET_UID,
    LOAD_ADMIN,
    FOLLOWING,
} from './types';
//
//-> Messages
//
// gets welcome message from api to check if api is running
export const welcomeMessage = () => async (dispatch) => {
  const response = await api.get('home')

  dispatch({ type: WELCOME_MESSAGE, payload: response.data});
};
//
//-> Authentications
//
// making an account
export const register = (formValues) => () => {
  api.post('user/register', {
    username: formValues.username,
    email: formValues.email.toLowerCase(),
    password: formValues.password
  })
  .then(res => {
    alert(res.data)
    history.push('/login')
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// logging into existing account
export const login = (formValues) => () => {
  api.post('user/login', {
    email: formValues.email.toLowerCase(),
    password: formValues.password
  })
  .then(async (res) => {
    await cookies.set('token', res.data, {
      domain: ".workoutboost.net"
    });
    history.push('/profile')
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Completing the verification of user
export const verification = (email) => async () => {
  await api.post(`user/verify/${email}`)
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Logging out of account
export const logout = () => async () => {
  await cookies.remove("token", {
    domain: ".workoutboost.net"
  });
  alert('Logged out')
  window.location.reload();
};
// Loading profile information
export const loadProfile = () => async (dispatch) => {
  const response = await api.get('user/profile',{
    params: {token: cookies.get('token')}
  })

  dispatch({ type: LOAD_PROFILE, payload: response.data});
};
// Update profile information
export const updateProfile = (formValues) => async () => {
  await api.patch('user/update', {
    username: formValues.username,
    email: formValues.email,
    password: formValues.password,
    bio: formValues.bio
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Forgot Password
export const forgotPassword = (email) => async () => {
  await api.get(`user/forgotPass/${email}`)
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Update profile information
export const updatePassword = (form) => async () => {
  await api.post(`user/updatePass/${form.email}`, {
    code: form.code,
    password: form.password
  })
  .then(res => {
    alert(res.data)
    history.push('/login')
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Get user info from authentication
export const getUserInfo = () => async (dispatch) => {
  const response = await api.get(`user/getUserInfo`,{
    params: {token: cookies.get('token')}
  })

  dispatch({ type: GET_UID, payload: response.data});
}
//
//-> Posts
//
// Creating a post
export const createPost = (formValues) => async (dispatch) => {
  await api.post('posts', {
    description: formValues.description
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err=> {
    alert(err.response.data)
  })
};
// Get all the posts
export const getPost = () => async (dispatch) => {
  const response = await api.get('posts')

  dispatch({ type: GET_POST, payload: response.data});
};
// Delete a single post
export const deletePost = (id) => async (dispatch) => {
  await api.delete(`posts/${id}`, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    alert('Post Deleted')
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  }, {
    params: {token: cookies.get('token')}
  })
};
// Get posts that include a keyword
export const getKeyword = (keyword) => async (dispatch) => {
  const response = await api.get(`posts/keyword/${keyword}`)

  dispatch({ type: GET_POST, payload: response.data});
};
// Comment on a post
export const createComment = (comment, postUid, id) => async () => {
  await api.post(`posts/comment/${id}`, {
    postUid,
    postId: id,
    comment
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Delete a comment (could be from owner of post or commenter)
export const deleteComment = (comment, commentUid, id) => async () => {
  await api({
    method: 'delete',
    url: `posts/comment/${id}`,
    data: {
      commentUid,
      postId: id,
      comment,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err=> {
    alert(err.response.data)
  })
};
// Add post to users saved collection
export const addSaved = (postId, postUid) => async () => {
  await api.post(`saved`, {
    postId,
    postUid,
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err=> {
    alert(err.response.data)
  })
}
// Get all saved post from user
export const getSaved = () => async (dispatch) => {
  const response = await api.get('saved', {
    params: {token: cookies.get('token')}
  })

  dispatch({ type: GET_POST, payload: response.data});
};
// Remove a saved post from users collection
export const deleteSaved = (id) => async (dispatch) => {
  await api.delete(`saved/${id}`, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Get all users posts that they've posted
export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await api.get(`userPosts/${uid}`)

  dispatch({ type: GET_POST, payload: response.data});
}
//
// -> Following Users
//
// Follow User
export const follow = (userId) => async (dispatch) => {
  await api.post(`following`, {
    userId,
  }, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    dispatch({ type: FOLLOWING, payload: res.data});
  })
  .catch(err=> {
    alert(err.response.data)
  })
}
// Get all posts from followed user
export const getFollowing = () => async (dispatch) => {
  const response = await api.get('following', {
    params: {token: cookies.get('token')}
  })

  dispatch({ type: GET_POST, payload: response.data});
};
// Check who the user is following
export const followingWho = () => async (dispatch) => {
  const response = await api.get('followingWho', {
    params: {token: cookies.get('token')}
  })

  dispatch({ type: FOLLOWING, payload: response.data});
};
// unfollow user
export const unfollow = (id) => async (dispatch) => {
  await api.delete(`unfollow/${id}`, {
    params: {token: cookies.get('token')}
  })
  .then(res => {
    dispatch({ type: FOLLOWING, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Following List
export const followingList = () => async (dispatch) => {
  const response = await api.get('followingList', {
    params: {token: cookies.get('token')}
  })

  dispatch({ type: FOLLOWING, payload: response.data});
};
// Followers List
export const followersList = () => async (dispatch) => {
  const response = await api.get('followersList', {
    params: {token: cookies.get('token')}
  })

  dispatch({ type: FOLLOWING, payload: response.data});
};
//
// -> Administrative Control
//
// Get all the accounts and their information
export const adminGetUsers = () => async (dispatch) => {
  const response = await api.get('admin/users')

  dispatch({ type: LOAD_ADMIN, payload: response.data});
};
// Delete single account
export const adminDeleteUser = (id) => async (dispatch) => {
  const response = await api.delete(`admin/${id}`)

  dispatch({ type: LOAD_ADMIN, payload: response.data});
};
// Get all the posts
export const adminGetPost = () => async (dispatch) => {
  const response = await api.get('/admin/posts')

  dispatch({ type: GET_POST, payload: response.data});
};
// Delete a single post
export const adminDeletePost = (id) => async (dispatch) => {
  await api.delete(`admin/posts/${id}`)
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Delete a comment
export const adminDeleteComment = (comment, commentUid, id) => async (dispatch) => {
  await api({
    method: 'delete',
    url: `admin/posts/comment/${id}`,
    data: {
      commentUid,
      postId: id,
      comment,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err=> {
    alert(err.response.data)
  })
};
// Update profile information
export const adminUpdateProfile = (category, input, id) => async () => {
  await api.patch(`admin/user/update/${id}`, {
    category,
    input
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
};