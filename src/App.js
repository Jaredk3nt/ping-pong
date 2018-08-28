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
// Variables
import { theme, colors } from './theme.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerList: [
                { name: 'Jared', id: 0, games: 0, wins: 0, hold: false },
                { name: 'Adrian', id: 1, games: 0, wins: 0, hold: false },
                { name: 'Stephanie', id: 6, games: 0, wins: 0, hold: false },
            ],
            currentPlayers: {
                left: {
                    player1: { name: 'Nathan', id: 2, games: 0, wins: 0, hold: false },
                    player2: { name: 'JD', id: 3, games: 0, wins: 0, hold: false },
                },
                right: {
                    player1: { name: 'Jonathan', id: 4, games: 0, wins: 0, hold: false },
                    player2: { name: 'Kyle', id: 5, games: 0, wins: 0, hold: false },
                },
            },
            theming: {
                theme,
                currentColor: 0,
            },
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

    playerLeave = (player) => {
        const { playerList } = this.state;
        this.setState({
            playerList: playerList.filter(p => p.id !== player.id),
        })
    }

    playerHold = (player) => {
        const { playerList } = this.state;
        playerList.forEach(p => {
            if (p.id === player.id) {
                p.hold = !p.hold;
            }
        });
        this.setState({ playerList });
    }

    onGameEnd = (winningSide) => {
        let { currentPlayers, playerList } = this.state;
        let winners = currentPlayers[winningSide];
        let losers = currentPlayers[winningSide === 'left' ? 'right' : 'left'];
        // Update stats
        winners.player1.wins++;
        winners.player2.wins++;
        winners.player1.games++;
        winners.player2.games++;
        losers.player1.games++;
        losers.player2.games++;
        // Add losers back to the playerList
        playerList = [...playerList, losers.player1, losers.player2 ];
        // Move winners
        currentPlayers = { 
            left: { player1: winners.player1, player2: {} }, 
            right: { player1: winners.player2, player2: {} } 
        };
        // Assign new players
        /* Make this reusable or better geezus */
        for (let i in playerList) {
            let player = playerList[i];
            if (!player.hold) {
                currentPlayers.left.player2 = playerList.splice(i, 1)[0];
                break;
            } else {
                playerList.push(playerList.splice(i, 1)[0]);
            }
        }
        for (let i in playerList) {
            let player = playerList[i];
            if (!player.hold) {
                currentPlayers.right.player2 = playerList.splice(i, 1)[0];
                break;
            } else {
                playerList.push(playerList.splice(i, 1)[0]);
            }
        }
        this.setState({
            playerList,
            currentPlayers
        });
    }

    render() {
        const { playerList, theming: { theme }, currentPlayers } = this.state;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Navbar>
                            <strong>CDK Table Tennis Doubles</strong>
                            <button onClick={this.changeColor}>Change Color</button>
                        </Navbar>
                        <div className={pageBody}>
                            <div className={content}>
                                <Table players={currentPlayers} onGameEnd={this.onGameEnd} />
                            </div>
                            <div>
                                <ScrollableView>
                                    {
                                        playerList.map((player) => (
                                            <SlideIn key={player.id}>
                                                <ContentCard>
                                                    <ContentCardBody>
                                                        <ContentCardTitle>
                                                            {player.name}
                                                            {player.hold && <span className='subtitle'>Sitting Out</span>}
                                                        </ContentCardTitle>
                                                        <ContentCardText>{`${player.wins}/${player.games}`}</ContentCardText>
                                                    </ContentCardBody>
                                                    <ContentCardFooter>
                                                        <ContentCardAction
                                                            onClick={() => this.playerHold(player)}
                                                        >
                                                            { player.hold ? 'Rejoin' : 'Sit out' }
                                                        </ContentCardAction>
                                                        <ContentCardAction 
                                                            onClick={() => this.playerLeave(player)}
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
    grid-template-columns: 1fr 20%;
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
