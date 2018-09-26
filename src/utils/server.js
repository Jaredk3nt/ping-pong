import fetch from 'node-fetch';

const url = 'http://localhost:3001';

const getPlayers = async () => {
    const res = await fetch(`${url}/players`);
    return await res.json();
}

const addPlayer = async (body) => {
    const res = await fetch(`${url}/players`, { 
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

const addGame = async (body) => {
    const res = await fetch(`${url}/games`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export {
    getPlayers,
    addPlayer,
    addGame
}