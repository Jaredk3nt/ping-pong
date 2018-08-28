import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
// Components
// Utis / Variables
import { TeamPropType } from '../propTypes';

const Table = ({ players, onGameEnd }) => {
    return (
        <React.Fragment>
            <CenterFlex>
                <TablePlayers players={players.left}/>
                <PingPongTable />
                <TablePlayers players={players.right}/>
            </CenterFlex>
            <CenterFlex>
                <button onClick={() => onGameEnd('left')}>Team 1</button>
                <button onClick={() => onGameEnd('right')}>Team 2</button>
            </CenterFlex>
        </React.Fragment>
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
`;
const PingPongTable = styled('div')`
    position: relative;
    width: 32em;
    height: 18em;
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
        top: calc(50% - 1px);
        left: 0;
        box-sizing: border-box;
    }
`;
const TablePlayers = ({ players }) => (
    <TablePlayersContainer>
        <TablePlayer>{players.player1.name}</TablePlayer>
        <TablePlayer>{players.player2.name}</TablePlayer>
    </TablePlayersContainer>
);
const TablePlayersContainer = styled('div')`
    height: 18em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0em 2em;
`;
const TablePlayer = styled('div')`
    width: 100%;
    min-width: 6em;
    text-align: center;
    font-weight: 700;
    font-size: 1.25rem;
`

export default Table;