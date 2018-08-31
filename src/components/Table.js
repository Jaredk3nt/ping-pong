import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
// Components
import Button from './Button';
// Utis / Variables
import { TeamPropType } from '../propTypes';

const Table = ({ players, onGameEnd, leave }) => {
    return (
        <CenterFlexFiller direction='column'>
            <CenterFlex>
                <TablePlayers players={players.left} side='left' leave={leave} />
                <PingPongTable />
                <TablePlayers players={players.right} side='right' leave={leave} />
            </CenterFlex>
            <CenterFlex padding='1em 0em'>
                <Button 
                    primary 
                    margin='0em 2em'
                    onClick={() => onGameEnd('left')}
                >
                    Team 1 Win
                </Button>
                <Button 
                    primary 
                    margin='0em 2em'
                    onClick={() => onGameEnd('right')}
                >
                    Team 2 Win
                </Button>
            </CenterFlex>
        </CenterFlexFiller>
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
    flex-direction: ${props => props.direction || 'row'};
    padding: ${props => props.padding || '0em'};
`;
const CenterFlexFiller = styled(CenterFlex)`
    height: 100%;
    width: 100%;
`;
const PingPongTable = styled('div')`
    position: relative;
    width: 32em;
    height: 18em;
    background-color: ${props => props.theme.primary};
    border: 4px solid white;
    outline: 2px solid ${props => props.theme.primary};
    box-sizing: border-box;
    box-shadow: 0px 0px 20px rgba(0,0,0,.3);
    &:after {
        content: " ";
        height: 100%;
        border: 2px solid ${props => props.theme.primary === '#000' ? '#333' : 'black'};
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
const TablePlayers = ({ players, side, leave }) => (
    <TablePlayersContainer>
        <TablePlayer side={side}>
            {
                players.player1 && (
                    <React.Fragment>
                        {players.player1}
                        <HoverButton small primary onClick={() => leave(side, 'player1')}>Leave Game</HoverButton>
                    </React.Fragment>
                )
            }
        </TablePlayer>
        <TablePlayer side={side}>
            {
                players.player2 && (
                    <React.Fragment>
                        {players.player2}
                        <HoverButton small primary onClick={() => leave(side, 'player2')}>Leave Game</HoverButton>
                    </React.Fragment>
                )
            }
        </TablePlayer>
    </TablePlayersContainer>
);
const TablePlayersContainer = styled('div')`
    height: 18em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
const TablePlayer = styled('div')`
    width: 100%;
    min-width: 10em;
    text-align: center;
    font-weight: 700;
    font-size: 1.25rem;
    position: relative;
    text-shadow: 
        -4px -4px 0 white,
        4px -4px 0 white,
        -4px 4px 0 white,
        4px 4px 0 white; 
    &:after {
        content: " ";
        position: absolute;
        width: 50%;
        ${props => props.side === 'left' ? 'right: 0' : 'left: 0'};
        top: 50%;
        border: 1px solid #ccc;
        z-index: -1;
    }
`
const HoverButton = styled(Button)`
    position: absolute;
    top: 0;
    left: 25%;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`

export default Table;