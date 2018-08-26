import React, { Component } from 'react';
import { css } from 'emotion';

class AddPlayerForm extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPlayer(this.state.value);
    }

    cancel() {
        this.props.addingPlayer(false);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
          <input type="text" ref="name" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input name="add" type="submit" value="Submit" />
                </form>
                <button type="button" onClick={this.cancel}>Cancel</button>
            </div>
        );
    }
}

export default AddPlayerForm;