import React, { Component } from "react";
import { ContentCardAction } from "./ContentCard";

class AddPlayerButton extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.addingPlayer(true);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ContentCardAction>Add Player</ContentCardAction>
            </form>
        );
    }
}

export default AddPlayerButton;
