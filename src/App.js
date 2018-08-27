import React, { Component } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
// Components
import ScrollableView from './components/ScrollableView';
import { 
    ContentCard, 
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
                { name: 'Jared', id: 0, games: 0 },
                { name: 'Adrian', id: 1, games: 0 },
            ],
            currentPlayers: {
                left: {
                    player1: {},
                    player2: {},
                },
                right: {
                    player1: {},
                    player2: {},
                },
            },
            theming: {
                theme,
                currentColor: 'blue',
            },
        }
    }

    changeColor = () => {
        const { theming: { theme, currentColor} } = this.state;
        let newColor,
            newTheme = theme;
        switch(currentColor) {
            case 'blue':
                newColor = 'green';
                break;
            case 'green':
                newColor = 'red';
                break;
            case 'red':
                newColor = 'blue';
                break;
        }
        newTheme.primary = colors[newColor];
        this.setState({
            theming: {
                theme: newTheme,
                currentColor: newColor
            }
        });
    }

    playerLeave = (player) => {
        const { playerList } = this.state;
        this.setState({
            playerList: playerList.filter(p => p.name !== player.name),
        })
    }

    render() {
        const { playerList, theming: { theme }, currentPlayers } = this.state;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Navbar>
                            Ping Pong
                            <button onClick={this.changeColor}>Change Color</button>
                        </Navbar>
                        <div className={pageBody}>
                            <div className={content}>
                                <Table players={currentPlayers} />
                            </div>
                            <div>
                                <ScrollableView>
                                    {
                                        playerList.map((player) => (
                                            <ContentCard>
                                                <ContentCardText>
                                                    {player.name}
                                                </ContentCardText>
                                                <ContentCardFooter>
                                                    <ContentCardAction>Sit out</ContentCardAction>
                                                    <ContentCardAction 
                                                        onClick={() => this.playerLeave(player)}>
                                                        Leave game
                                                    </ContentCardAction>
                                                </ContentCardFooter>
                                            </ContentCard>
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

export default App;
