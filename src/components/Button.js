import styled from 'react-emotion';

const Button = styled('button')`
    padding: .5em 1em;
    border: none;
    border-radius: 4px;
    font-size: ${props => props.small ? '.8rem' : '1rem'};
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
    ${props => props.transparent ?
        ` background-color: #00000000;` : ''
    }
`

export default Button;