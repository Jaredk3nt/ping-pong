import fetch from 'node-fetch';

const url = 'http://localhost:3001';

const getPlayers = async () => {
    const res = await fetch(`${url}/players`);
    return await res.json();
}

const addPlayer = async (name) => {
    console.log(name);
    return await fetch(`${url}/players`, { 
        method: 'POST',
        body: { name }
    });
}

const addGame = async (table, winningSide) => {
    console.log(winningSide);
    return await fetch(`${url}/games`, {
        method: 'POST',
        body: { 
            table,
            winningSide
        }
    });
}

export {
    getPlayers,
    addPlayer,
    addGame
}