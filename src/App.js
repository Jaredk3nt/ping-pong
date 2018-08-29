import React, { Component } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
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
import Navbar from './components/Navbar';
import Table from './components/Table';
import Leaderboard from './components/Leaderboard';
import Button from './components/Button';
// Variables
import { theme, colors } from './theme.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: {
                Jared : { name: 'Jared', id: 0, games: 0, wins: 0, hold: false },
                Adrian:  { name: 'Adrian', id: 1, games: 0, wins: 0, hold: false },
                Stephanie:  { name: 'Stephanie', id: 6, games: 0, wins: 0, hold: false },
                Nathan: { name: 'Nathan', id: 2, games: 0, wins: 0, hold: false },
                JD: { name: 'JD', id: 3, games: 0, wins: 0, hold: false },
                Jonathan: { name: 'Jonathan', id: 4, games: 0, wins: 0, hold: false },
                Kyle: { name: 'Kyle', id: 5, games: 0, wins: 0, hold: false },
            },
            playerList: [ 'Jared', 'Adrian', 'Stephanie', 'Nathan', 'JD', 'Jonathan', 'Kyle'],
            currentPlayers: { left: { }, right: { } },
            theming: { theme, currentColor: 0, },
        }
    }

    changeColor = () => {
        const { theming: { theme, currentColor}, } = this.state;
        let newColor = (currentColor + 1) >= colors.length ? 0 : currentColor + 1;
        theme.primary = colors[newColor];
        this.setState({
            theming: {
                theme,
                currentColor: newColor
            },
        });
    }

    playerLeave = (playerName) => {
        const { playerList } = this.state;
        this.setState({
            playerList: playerList.filter(p => p !== playerName),
        })
    }

    playerHold = (playerName) => {
        const { players } = this.state;
        players[playerName].hold = !players[playerName].hold;
        this.setState({ players });
    }

    onGameEnd = (winningSide) => {
        let { players, currentPlayers, playerList } = this.state;
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
        playerList = [...playerList, losers.player1, losers.player2 ];
        // Assign new teams
        this.findNextPlayer('left', 'player2'),
        this.findNextPlayer('right', 'player2');
        currentPlayers = { 
            left: { player1: winners.player1, player2: p1 }, 
            right: { player1: winners.player2, player2: p2 } 
        };
        this.setState({
            players,
            playerList: playerListUpdated2,
            currentPlayers
        });
    }

    findNextPlayer2 = (playerList, teammate) => {
        console.log(playerList);
        // Use teammate to pick the upcoming player with the furthest play history with teammate
        const { players } = this.state;
        let nextPlayer;
        for(let i in playerList) {
            let playerInfo = players[playerList[i]];
            if (!playerInfo.hold) {
                nextPlayer = playerList.splice(i, 1)[0];
                break;
            } else {
                playerList.push(playerList.splice(i, 1)[0]);
            }
        }
        console.log(playerList);
        return { nextPlayer, playerList };
    }

    findNextPlayer = (side, position) => {
        this.setState((prevState) => {
            
        })
        const { players, playerList, currentPlayers } = this.state;
        let nextPlayer;
        for(let i in playerList) {
            let playerInfo = players[playerList[i]];
            if (!playerInfo.hold) {
                nextPlayer = playerList.splice(i, 1)[0];
                break;
            } else {
                playerList.push(playerList.splice(i, 1)[0]);
            }
        }
    }

    startGame = () => {
        const { playerList } = this.state; 
        let { nextPlayer: p1, playerList: playerListUpdated } = this.findNextPlayer(playerList),
            { nextPlayer: p2, playerList: playerListUpdated2 } = this.findNextPlayer(playerListUpdated),
            { nextPlayer: p3, playerList: playerListUpdated3 } = this.findNextPlayer(playerListUpdated2),
            { nextPlayer: p4, playerList: playerListUpdated4 } = this.findNextPlayer(playerListUpdated3);
        console.log(`${p1} ${p2} ${p3} ${p4}`)
        this.setState({
            currentPlayers: {
                left: { player1: p1, player2: p3 },
                right: { player1: p2, player2: p4 }
            },
            playerList: playerListUpdated4
        }, () => {
            console.log(this.state.currentPlayers);
        });
    }

    playerInfoList = () => {
        return Object.entries(this.state.players).map(([key, value]) => value)
    }

    render() {
        const { players, playerList, theming: { theme }, currentPlayers } = this.state;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Navbar>
                            <strong>CDK Table Tennis Doubles</strong>
                            <Button small onClick={this.changeColor}>Change Color</Button>
                        </Navbar>
                        <div className={pageBody}>
                            <Leaderboard playerList={this.playerInfoList()} />
                            <div className={content}>
                                <Table players={currentPlayers} onGameEnd={this.onGameEnd} />
                            </div>
                            <div>
                                <ScrollableView>
                                    <Button 
                                        onClick={this.startGame}
                                        margin='0em 1em 0em 0em'
                                    >
                                        Start Game
                                    </Button>
                                    <Button>Add Player</Button>
                                    {
                                        playerList.map((p) => (
                                            <SlideIn key={players[p].id}>
                                                <ContentCard>
                                                    <ContentCardBody>
                                                        <ContentCardTitle>
                                                            {p}
                                                            {players[p].hold && <span className='subtitle'>Sitting Out</span>}
                                                        </ContentCardTitle>
                                                        <ContentCardText>{`${players[p].wins}/${players[p].games}`}</ContentCardText>
                                                    </ContentCardBody>
                                                    <ContentCardFooter>
                                                        <ContentCardAction
                                                            onClick={() => this.playerHold(p)}
                                                        >
                                                            { players[p].hold ? 'Rejoin' : 'Sit out' }
                                                        </ContentCardAction>
                                                        <ContentCardAction 
                                                            onClick={() => this.playerLeave(p)}
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
                        </div>
                    </React.Fragment>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

// Styles
const pageBody = css`
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    padding-top: ${theme.navHeight};
    display: grid;
    grid-template-columns: 15% 1fr 20%;
    box-sizing: border-box;
    overflow: hidden;
`;
const content = css`
    width: 100%;
    height: 100%;
`;
const slideInAnim = keyframes`${slideInRight}`
const SlideIn = styled('div')`
    animation: .5s ${slideInAnim};
`

export default App;
