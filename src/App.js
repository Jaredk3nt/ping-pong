import React, { Component } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming'
// Components
import ScrollableView from './components/ScrollableView';
import AddPlayerForm from './components/AddPlayerForm';
import AddPlayerButton from './components/AddPlayerButton';
import {
    ContentCard,
    ContentCardText,
    ContentCardFooter,
    ContentCardAction
} from './components/ContentCard';
import theme from './theme.js'

// Variables
const navHeight = '3em';

class App extends Component {
    id;
    constructor(props) {
        super(props);
        this.state = {
            originalPlayerList: [
                { name: 'Jared', id: 0 },
                { name: 'Adrian', id: 1 },
            ],
            playerList: [
                { name: 'Jared', id: 0 },
                { name: 'Adrian', id: 1 }
            ],
            addingPlayer: false
        }
        this.id = 1
        this.addPlayer = this.addPlayer.bind(this);
        this.addingPlayer = this.addingPlayer.bind(this);
    }

    addingPlayer(addingPlayer) {
        this.setState({ addingPlayer: addingPlayer }) // making input field show up
    }

    addPlayer(name) {
        this.id++;
        this.setState({
            originalPlayerList: this.state.originalPlayerList.concat({ name: name, id: this.id }),
            playerList: this.state.playerList.concat({ name: name, id: this.id }),
            addingPlayer: false // reverting to input field
        });
    }

    render() {
        const { playerList } = this.state;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <div className={navbar}></div>
                        <div className={pageBody}>
                            <div className={content}>
                                <h1>Hi</h1>
                            </div>
                            <ScrollableView>
                                <div className={addPlayerForm}>
                                    {
                                        this.state.addingPlayer ?
                                            <AddPlayerForm addPlayer={this.addPlayer} addingPlayer={this.addingPlayer} /> :
                                            <AddPlayerButton addingPlayer={this.addingPlayer} />
                                    }
                                </div>
                                {
                                    playerList.map((player) => (
                                        <ContentCard>
                                            <ContentCardText>
                                                {player.name}
                                            </ContentCardText>
                                            <ContentCardFooter>
                                                <ContentCardAction>Sit out</ContentCardAction>
                                                <ContentCardAction>Leave game</ContentCardAction>
                                            </ContentCardFooter>
                                        </ContentCard>
                                    ))
                                }
                            </ScrollableView>
                        </div>
                    </React.Fragment>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

// Styles
const navbar = css`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${navHeight};
    background-color: red;
`;
const pageBody = css`
    width: 100vw;
    height: 100vh;
    padding-top: ${navHeight};
    display: grid;
    grid-template-columns: 1fr 20%;
    box-sizing:border-box;
`;
const content = css`
    width: 100%;
    height: 100%;
`;

const addPlayerForm = css`
    width: 100%;
    height: 6%;
`;

export default App;
