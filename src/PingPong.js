import React, { Component } from 'react';
import styled, { keyframes } from 'react-emotion';
import { slideInRight } from 'react-animations';
// Components
import ScrollableView from './components/ScrollableView';
import {
    ContentCard,
    ContentCardBody,
    ContentCardTitle,
    ContentCardText,
    ContentCardFooter,
    ContentCardAction
} from './components/ContentCard';
import Table from './components/Table';
import Leaderboard from './components/Leaderboard';
import Button from './components/Button';
import PlayerSelectModal from './components/Modal';
// Variables

class PingPong extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: {},
            playerList: [],
            currentPlayers: { left: {}, right: {} },
            boardClear: true,
            playerModalOpen: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { boardClear, playerList } = this.state;
        if (!this.gameInSession() && playerList.length && !boardClear) {
            this.fillTable();
        }
    }

    fillTable = () => {
        const { currentPlayers: { left, right } } = this.state;
        this.setState(() => ({ boardClear: true }));
        if (!left.player1) this.findNextPlayer('left', 'player1');
        if (!right.player1) this.findNextPlayer('right', 'player1');
        if (!left.player2) this.findNextPlayer('left', 'player2');
        if (!right.player2) this.findNextPlayer('right', 'player2');
    }

    playerLeave = (playerName) => {
        const { playerList } = this.state;
        this.setState({
            playerList: playerList.filter(p => p !== playerName),
        });
    }

    playerHold = (playerName) => {
        const { players } = this.state;
        players[playerName].hold = !players[playerName].hold;
        this.setState({ players });
    }

    playerLeaveGame = (side, position) => {
        this.setState((prevState) => {
            const { currentPlayers, playerList } = prevState;
            let player = currentPlayers[side][position];
            currentPlayers[side][position] = undefined;
            return {
                currentPlayers,
                playerList: [...playerList, player]
            }
        })
    }

    onGameEnd = (winningSide) => {
        if (this.gameInSession()) {
            this.setState((prevState) => {
                let { players, currentPlayers, playerList } = prevState;
                let winners = currentPlayers[winningSide];
                let losers = currentPlayers[winningSide === 'left' ? 'right' : 'left'];
                // Update stats
                players[winners.player1].wins++;
                players[winners.player2].wins++;
                players[winners.player1].games++;
                players[winners.player2].games++;
                players[losers.player1].games++;
                players[losers.player2].games++;
                // Add losers back to the playerList
                playerList = [...playerList, losers.player1, losers.player2];
                // Assign new teams
                currentPlayers.left.player1 = winners.player1;
                currentPlayers.right.player1 = winners.player2;
                currentPlayers.left.player2 = undefined;
                currentPlayers.right.player2 = undefined;
                return {
                    players,
                    playerList,
                    currentPlayers,
                    boardClear: false
                };
            });
        }
    }

    findNextPlayer = (side, position) => {
        this.setState((prevState) => {
            const { players, playerList, currentPlayers } = prevState;
            for (let i in playerList) {
                let playerInfo = players[playerList[i]];
                if (!playerInfo.hold) {
                    currentPlayers[side][position] = playerList.splice(i, 1)[0];
                    break;
                }
            }
            return { currentPlayers, playerList }
        });
    }

    startGame = () => {
        this.setState(() => ({ boardClear: false }));
        this.fillTable();
    }

    endGame = () => {
        const { currentPlayers, playerList } = this.state;
        this.setState({
            playerList: [
                ...playerList,
                currentPlayers.left.player1,
                currentPlayers.left.player2,
                currentPlayers.right.player1,
                currentPlayers.right.player2,
            ],
            currentPlayers: { left: {}, right: {} },
            boardClear: true
        })
    }

    playerInfoList = () => {
        return Object.values(this.state.players).map(value => value)
    }

    gameInSession = () => {
        const { currentPlayers } = this.state;
        return currentPlayers.left.player1 &&
            currentPlayers.left.player2 &&
            currentPlayers.right.player1 &&
            currentPlayers.right.player2
    }

    addPlayerToList = (player) => {
        let { playerList: newPlayerList, players } = this.state;
        const i = newPlayerList.findIndex(p => players[p].games > 0);
        if (i >= 0) {
            newPlayerList.splice(i, 0, player.id);
        } else {
            newPlayerList.push(player.id);
        }
        this.setState({
            players: { ...players, [player.id]: player },
            playerList: newPlayerList,
            playerModalOpen: false
        });
    }

    openModal = () => {
        this.setState({
            playerModalOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            playerModalOpen: false
        })
    }

    render() { 
        const { 
            players, 
            playerList, 
            currentPlayers,
            playerModalOpen
        } = this.state;
        const {
            players: propsPlayers,
            isLoading
        } = this.props;

        return ( 
            <React.Fragment>
                <PlayerSelectModal
                    visible={playerModalOpen}
                    players={propsPlayers}
                    addPlayer={this.addPlayerToList}
                    close={this.closeModal}
                />
                <PageBody>
                    <Leaderboard playerList={this.playerInfoList()} />
                    <Content>
                        <Table players={currentPlayers} onGameEnd={this.onGameEnd} leave={this.playerLeaveGame} />
                    </Content>
                    <div>
                        <ActionArea>
                            {
                                this.gameInSession() ?
                                    <Button
                                        onClick={this.endGame}
                                        margin='0em 1em 0em 0em'
                                    >
                                        End Game
                                </Button>
                                    :
                                    <Button
                                        onClick={this.startGame}
                                        margin='0em 1em 0em 0em'
                                    >
                                        Start Game
                                </Button>
                            }
                            <Button 
                                onClick={this.openModal}
                            >
                                Add Player
                            </Button>
                        </ActionArea>

                        <ScrollableView>
                            {
                                playerList.map((playerId) => (
                                    <SlideIn key={playerId}>
                                        <ContentCard>
                                            <ContentCardBody>
                                                <ContentCardTitle>
                                                    {players[playerId].name}
                                                    {players[playerId].hold && <span className='subtitle'>Sitting Out</span>}
                                                </ContentCardTitle>
                                                <ContentCardText>{`${players[playerId].wins}/${players[playerId].games}`}</ContentCardText>
                                            </ContentCardBody>
                                            <ContentCardFooter>
                                                <ContentCardAction
                                                    onClick={() => this.playerHold(playerId)}
                                                >
                                                    {players[playerId].hold ? 'Rejoin' : 'Sit out'}
                                                </ContentCardAction>
                                                <ContentCardAction
                                                    onClick={() => this.playerLeave(playerId)}
                                                >
                                                    Leave game
                                                </ContentCardAction>
                                            </ContentCardFooter>
                                        </ContentCard>
                                    </SlideIn>
                                ))
                            }
                        </ScrollableView>
                    </div>
                </PageBody>
            </React.Fragment>
        );
    }
}

// Styles
const PageBody = styled('div')`
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    padding-top: ${props => props.theme.navHeight};
    display: grid;
    grid-template-columns: 15% 1fr 20%;
    box-sizing: border-box;
    overflow: hidden;
`;
const Content = styled('div')`
    width: 100%;
    height: 100%;
    max-height: 100vh;
`;
const slideInAnim = keyframes`${slideInRight}`;
const SlideIn = styled('div')`
    animation: .5s ${slideInAnim};
`;
const ActionArea = styled('div')`
    padding: .5em;
    background-color: #efefef;
`
 
export default PingPong;