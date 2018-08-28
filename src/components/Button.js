import React from 'react';
import styled from 'react-emotion';

const Button = styled('button')`
    padding: .5em 1em;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    margin: ${props => props.margin || '0px'};
    &:hover {
        cursor: pointer;
    }
    ${props => props.primary ? 
        `
            background-color: ${props.theme.primary};
            color: white;
            &:active {
                background-color: ${props.theme.primaryLight}
            }
        ` 
        : 
        `
            background-color: white;
            color: ${props.theme.primary};
            &:active {
                background-color: #eee;
            }
        `
    }
`

export default Button;