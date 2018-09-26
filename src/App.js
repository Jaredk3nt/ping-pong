import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
// Components
import HttpHandler from './HttpHandler';
import PingPong from './PingPong';
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
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <HttpHandler>
                        <PingPong />
                    </HttpHandler>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
