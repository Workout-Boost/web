import React, { Component } from "react";
import { connect } from 'react-redux';
import { createPost } from '../actions';
import "./styles/Home.css"

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    onSubmit = () => {
        let desc = this.state.description
        desc = desc.replace(/\r?\n/g, '<br />');
        this.props.createPost({
            description: desc
        });
        this.setState({
            description: ''
        });
        this.props.toggle();
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="share-modal">
                <div className="share-modal-content">
                    <span className="close" onClick={this.handleClick}>&times;</span>
                    <hr className="hr" />
                    <textarea
                    wrap="soft"
                    rows="9"
                    cols="50"
                    name="description"
                    placeholder="Enter Description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    required
                    />
                    <br/>
                    <button className="publish" onClick={this.onSubmit}>Post</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { createPost }
  )(CreatePost);
  