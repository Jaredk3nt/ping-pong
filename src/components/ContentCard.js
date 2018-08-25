import React from 'react';
import { css } from 'emotion';

const ContentCard = ({ children }) => <div className={contentCard}>{children}</div>
const contentCard = css`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border-radius: 4px;
    margin: .5em 0em;
`

const ContentCardText = ({ children }) => <div className={contentCardText}>{children}</div>
const contentCardText = css`
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
`

const ContentCardFooter = ({ children }) => <div className={contentCardFooter}>{children}</div>
const contentCardFooter = css`
    width: 100%;
    padding: .25em 1em;
    display: flex;
    box-sizing: border-box;
`

const ContentCardAction = ({ children }) => <button className={contentCardAction}>{children}</button>
const contentCardAction = css`
    border: none;
    background-color: red;
    box-shadow: none;
`

export {
    ContentCard,
    ContentCardText,
    ContentCardFooter
}