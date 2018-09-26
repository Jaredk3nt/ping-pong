import React, { Component } from 'react';
import Button from './Button';
import styled from 'react-emotion';

class AddPlayerForm extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPlayer(this.state.value);
    }

    render() {
        const { primary } = this.props;
        return (
           <span>
                <Form onSubmit={this.handleSubmit}>
                    <Input 
                        autoFocus 
                        type="text" 
                        value={this.state.value}
                        onChange={this.handleChange} 
                        placeholder='New player name'
                    />
                    <Button 
                        name="add" 
                        type="submit" 
                        value="Submit"
                        primary={primary}
                    >
                        Submit
                    </Button>
                </Form>
            </span>
        );
    }
}

const Form = styled('form')`
    display: block;
    margin: .5em 0em 0em;
    height: 3em;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;
    background: transparent;
    box-sizing: border-box;
    display: flex;
    background-color: white;
    border: 1px transparent;
    color: white;
`

const Input = styled('input')`
    display: block;
    margin-right: .5em;
    padding: .5em;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;
    background: transparent;
    box-sizing: border-box;
    background-color: #eee;
    border: none;
`

export default AddPlayerForm;