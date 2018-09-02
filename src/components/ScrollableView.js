import React from 'react';
import { css } from 'emotion';

const ScrollableView = ({ children }) => {
    return (
        <div className={boundingContainer}>
            <div className={scrollingContainer}>
                { children }
            </div>
        </div>
    )
}

const boundingContainer = css`
    width: 100%;
    height: calc(100vh - 3em);
    overflow: hidden;
    background-color: #efefef;
    position: relative;
    box-sizing: border-box;
    padding: 0em 0em 0em .5em;
    padding-bottom: 4em;
`;
const scrollingContainer = css`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-right: 1em;
    padding-bottom: 5em;
`;

 
export default ScrollableView;