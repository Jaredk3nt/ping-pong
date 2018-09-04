import React, { Component } from 'react';
import AddPlayerButton from './AddPlayerButton';
import AddPlayerForm from './AddPlayerForm';

class AddPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = { addingPlayer: false };
    }

    render() {
        return (
            <span>
                { 
                    this.state.addingPlayer ?
                    <AddPlayerForm addPlayerToList={this.props.addPlayerToList} addingPlayer={this.addingPlayer} /> :
                    <AddPlayerButton buttonText="Add Player" onClick={this.addingPlayer} />
                }
            </span>
        );
    }

    addingPlayer = (isAdding) => {
        this.setState({ addingPlayer: isAdding });
    }

    cancel = () => {
        console.log("hi");
        this.setState({ addingPlayer: false })
    }
}

export default AddPlayer;