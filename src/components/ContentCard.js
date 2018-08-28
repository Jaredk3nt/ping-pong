import styled from 'react-emotion'

const ContentCard = styled('div')`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border-radius: 4px;
    margin: .5em 0em;
`

const ContentCardBody = styled('div')`
    width: 100%;
    padding: 1em 1em .5em 1em;
    box-sizing: border-box;
`

const ContentCardTitle = styled('h1')`
    font-size: 1rem;
    font-weight: 700;
    margin: 0em 0em .25em 0em;
    .subtitle {
        color: #aaa;
        font-style: italic;
        font-weight: 400;
        font-size: .85rem;
        margin-left: .5em;
    }
`;

const ContentCardText = styled('p')`
    font-size: .85rem;
    margin: 0em;
`;

const ContentCardFooter = styled('div')`
    width: 100%;
    padding: .25em .5em .5em .5em;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
`

const ContentCardAction = styled('button')`
    border: none;
    border-radius: 4px;
    background-color: ${props => props.theme.primary};
    box-shadow: none;
    color: white;
    height: 2.5em;
    margin-right: .5em;
    padding: 0em 2em;
    width: 100%;
    &:hover {
        cursor: pointer;
    }
    &:active {
        background-color: ${props => props.theme.primaryLight}
    }
`

export {
    ContentCard,
    ContentCardBody,
    ContentCardTitle,
    ContentCardText,
    ContentCardFooter,
    ContentCardAction
}