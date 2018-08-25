import React from 'react';
import styled from 'react-emotion'

const ContentCard = styled('div')`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border-radius: 4px;
    margin: .5em 0em;
`

const ContentCardText = styled('div')`
    width: 100%;
    padding: 1em 1em .5em 1em;
    box-sizing: border-box;
    font-weight: 700;
`

const ContentCardFooter = styled('div')`
    width: 100%;
    padding: .25em 1em .5em 1em;
    display: flex;
    box-sizing: border-box;
`

const ContentCardAction = styled('button')`
    border: none;
    background-color: ${props => props.theme.primary};
    box-shadow: none;
    border-radius: 4px;
    color: white;
    height: 2em;
    margin-right: .5em;
`

export {
    ContentCard,
    ContentCardText,
    ContentCardFooter,
    ContentCardAction
}