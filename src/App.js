import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
// Components
import HttpHandler from './HttpHandler';
import PingPong from './PingPong';
import Navbar from './components/Navbar';
import Button from './components/Button';
// Variables
import { theme, colors } from './theme.js';

class App extends Component {
    state = {
        theming: {
            theme,
            currentColor: 0
        }
    }

    changeColor = () => {
        const { theming: { theme, currentColor }, } = this.state;
        let newColor = (currentColor + 1) >= colors.length ? 0 : currentColor + 1;
        theme.primary = colors[newColor];
        this.setState({
            theming: {
                theme,
                currentColor: newColor
            },
        });
    }

    render() {
        const { theming: { theme } } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Navbar>
                        <strong>Table Tennis Doubles</strong>
                        <Button small onClick={this.changeColor}>Change Color</Button>
                    </Navbar>
                    <HttpHandler>
                        <PingPong />
                    </HttpHandler>
                </React.Fragment>
            </ThemeProvider>
        );
    }
}

export default App;
