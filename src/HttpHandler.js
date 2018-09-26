import React, { Component } from 'react';

import {
    getPlayers,
    addPlayer,
    addGame
} from './utils/server';

class HttpHandler extends Component {
    state = { 
        isLoading: false,
        players: []
    }

    async componentDidMount() {
        await this.updatePlayerList();
    }

    withLoading = async (fn, args =[]) => {
        this.setState(prevState => ({ isLoading: true }));
        const res = await fn(...args);
        this.setState(prevState => ({ isLoading: false }));
        return res;
    }

    updatePlayerList = async () => {
        const newPlayerList = await this.withLoading(getPlayers);
        this.setState(prevState => ({ players: newPlayerList }));
    }

    addNewPlayer = async (name) => {
        const res = await this.withLoading(addPlayer, [name]);
    }

    addGame = async (table, winningSide) => {
        const res = await this.withLoading(addGame, [table, winningSide]);
    }

    render() { 
        return ( 
            <React.Fragment>
                { 
                    React.Children.map(this.props.children, (child) =>
                        React.cloneElement(child, { 
                            ...this.state,
                        })
                    )
                }
            </React.Fragment>
        );
    }
}
 
export default HttpHandler;