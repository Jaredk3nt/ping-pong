import React, { Component } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming'
// Components
import ScrollableView from './components/ScrollableView';
import { 
    ContentCard, 
    ContentCardText,
    ContentCardFooter, 
    ContentCardAction 
} from './components/ContentCard';
// Variables
import theme from './theme.js'
const navHeight = '3em';

class App extends Component {
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
        }
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

export default App;
