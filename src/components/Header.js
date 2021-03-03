import React, { useState } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CreatePost from './CreatePost'

export default function Header(props) {
    const [expanded, setExpanded] = useState(false)
    const [seen, setSeen] = useState(false)
    const toggleShare = () => {
        setSeen(!seen)
    }
    return (
        <React.Fragment>
            {seen? <CreatePost toggle={toggleShare}/> : null}
            <SideNav
            style={{background: 'linear-gradient(90deg, rgb(255, 127, 60) 0%, rgb(255, 128, 0) 100%)'}}
            expanded={expanded}
            onSelect={(selected) => {
                if (selected === "post") {
                    props.history.push('/')
                    setExpanded(false)
                    setSeen(true)
                } else {
                    const to = '/' + selected;
                    props.history.push(to);
                    setExpanded(false)
                }
            }}
            onToggle={(expanded) => setExpanded(expanded)}
            >
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="">
                <NavItem>
                    <NavIcon>
                        <i className="fa fa-bolt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Boost
                    </NavText>
                </NavItem>
                <NavItem eventKey="">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="saved">
                    <NavIcon>
                        <i className="fa fa-bookmark" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Saved
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <i className="fa fa-user-circle" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="post">
                    <NavIcon>
                        <i className="fa fa-plus-square" style={{ fontSize: '1.75em', padding: '10px 10px 10px 10px', borderRadius:'10px', backgroundColor: 'orange' }} />
                    </NavIcon>
                    <NavText>
                        <h3 style={{paddingTop: '10px', marginTop: '50px'}}>
                            POST
                        </h3>
                    </NavText>
                </NavItem>
                </SideNav.Nav>
            </SideNav>
        </React.Fragment>
    )
}
