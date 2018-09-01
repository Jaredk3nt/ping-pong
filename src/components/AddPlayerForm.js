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
        this.props.addPlayerToList(this.state.value);
        this.props.addingPlayer(false);
    }

    cancel = () => {
        this.props.addingPlayer(false);
    }

    render() {
        return (
           <span>
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                    </label>
                    <Input type="text" ref="name" value={this.state.value} onChange={this.handleChange} />
                    <Button name="add" type="submit" value="Submit">Submit</Button>
                    <Button type="button" onClick={this.cancel}>Cancel</Button>
                </Form>
            </span>
        );
    }
}

const Form = styled('form')`
    display: block;
    margin: 2px;
    padding: 5px;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;
    background: transparent;
    box-sizing: border-box;
    ${props => props.primary ? 
        `
            background-color: ${props.theme.primary};
            border: 1px transparent;
            color: white;
        ` 
        : 
        `
            background-color: white;
            border: 1px transparent;
            color: ${props.theme.primary};
        `
    }
    ${props => props.transparent ?
        ` background-color: #00000000;` : ''
    }
`

const Input = styled('input')`
    display: block;
    margin: 2px;
    padding: 5px;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;
    background: transparent;
    box-sizing: border-box;
    ${props => props.primary ? 
        `
            background-color: ${props.theme.primary};
            border: 1px solid ${props.theme.primary};
            color: white;
        ` 
        : 
        `
            background-color: white;
            border: 1px solid ${props.theme.primary};
            color: ${props.theme.primary};
        `
    }
    ${props => props.transparent ?
        ` background-color: #00000000;` : ''
    }
`

export default AddPlayerForm;