import { connect } from 'react-redux';
import React, { Component } from 'react'
import {adminGetUsers, adminDeleteUser} from '../../actions'

class AdminUsers extends Component {
    componentDidMount() {
        this.props.adminGetUsers();
    }
    render() {
        let {admin} = this.props
        if (admin.length > 0) {
            return (
                <div>
                    <h3>Users List</h3>
                    <ul>
                        { admin.map(user =>
                        <li key={user._id}>
                            <label>
                                {user.username}<br/>
                                {user.email}<br/>
                                {user._id}<br/>
                                {user.createdAt}<br/>
                            </label>
                            <button onClick={()=> this.props.adminDeleteUser(user._id)}>Delete</button>
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

export default connect(mapStateToProps, {adminGetUsers, adminDeleteUser})(AdminUsers)