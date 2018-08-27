import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
// Components
// Utis / Variables
import { TeamPropType } from '../propTypes';

const Table = ({ players, onWin }) => {
    return (
        <CenterFlex>
            <PingPongTable />
        </CenterFlex>
    )
}
// Table props for the players
Table.propTypes = {
    players: PropTypes.shape({
        left: TeamPropType,
        right: TeamPropType
    }),
}

const CenterFlex = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const PingPongTable = styled('div')`
    position: relative;
    width: 32em;
    height: 20em;
    background-color: ${props => props.theme.primary};
    border: 4px solid white;
    outline: 2px solid ${props => props.theme.primary};
    box-sizing: border-box;
    &:after {
        content: " ";
        height: 100%;
        border: 2px solid black;
        position: absolute;
        top: 0;
        left: 50%;
        box-sizing: border-box;
    }
    &:before {
        content: " ";
        width: 100%;
        border: 1px solid white;
        position: absolute;
        top: 50%;
        left: 0;
        box-sizing: border-box;
    }
`;

export default Table;