import React from 'react';
import { connect } from 'react-redux';
import { followingList } from '../../actions';
import "../styles/Auth.css"

class FollowingList extends React.Component {

    componentDidMount() {
        this.props.followingList();
    }

    render() {
        let {following, history} = this.props
        if (following) {
            return (
                <div className="postContainer">
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="dropdown">
                            <button className={"dropbtn"}><i className={"fa fa-user-plus"}/> Following</button>
                        </div>
                    </div>
                    {
                        following.map(user =>
                            <p key={user._id}>
                                <hr style={{borderTop: "2px solid #a0a0a0"}} />
                                <button className="profileAvatar" onClick={()=> history.push(`/userProfile/${user._id}`)}><i className={`fa fa-${user.avatar}`}/></button>
                                <h2 className="profileUser">{user.username}</h2>
                                <br/>
                                <button className="profileVisit" onClick={()=> history.push(`/userProfile/${user._id}`)}>Visit</button>
                                {(()=> {
                                    if (user.avatar === "shield") {
                                        return <p className="profileText"><i className={`fa fa-${user.avatar}`}/>: Staff (Ask me for help)</p>
                                    } else if (user.avatar === "star") {
                                        return <p className="profileText"><i className={`fa fa-${user.avatar}`}/>: Co-Founder (Started Workout Boost)</p>
                                    } else if (user.avatar === "heartbeat") {
                                        return <p className="profileText"><i className={`fa fa-${user.avatar}`}/>: Verified User (trustworthy)</p>
                                    } else {
                                        return <p className="profileText"><i className={`fa fa-${user.avatar}`}/>: Default User</p>
                                    }
                                })()}
                                <p className="profileBio">{user.bio}</p>
                                <hr style={{top: "16.5px", position: "relative", marginTop: "-15px", borderTop: "2px solid #a0a0a0"}}/>
                            </p>
                        )
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="dropdown">
                            <button className={"dropbtn"}><i className={"fa fa-user-plus"}/> Following</button>
                        </div>
                    </div>
                    <p style={{fontSize:"20px", textAlign:"center"}}>You aren't following anyone</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        following: state.following,
    }
};

export default connect(
  mapStateToProps,
  { followingList }
)(FollowingList);