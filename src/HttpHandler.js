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

    withLoading = async (fn, body = {}) => {
        this.setState(prevState => ({ isLoading: true }));
        const res = await fn(body);
        this.setState(prevState => ({ isLoading: false }));
        return res;
    }

    updatePlayerList = async () => {
        const newPlayerList = await this.withLoading(getPlayers);
        this.setState(prevState => ({ players: newPlayerList }));
    }

    addNewPlayer = async (name) => {
        return await this.withLoading(addPlayer, {name});
    }

    addGame = async (table, winningSide) => {
        await this.withLoading(addGame, {table, winningSide});
    }

    render() { 
        return ( 
            <React.Fragment>
                { 
                    React.Children.map(this.props.children, (child) =>
                        React.cloneElement(child, { 
                            ...this.state,
                            updatePlayerList: this.updatePlayerList,
                            addNewPlayer: this.addNewPlayer,
                            addGame: this.addGame
                        })
                    )
                }
            </React.Fragment>
        );
    }
}
 
export default HttpHandler;