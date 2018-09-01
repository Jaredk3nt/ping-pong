import React from 'react';
import styled from 'react-emotion';
// Components
import ScrollableView from './ScrollableView';
// Utils/Variables

const Leaderboard = ({ playerList }) => {
    const playerRankings = () => {
        const rankSort = (a, b) => {
            let aa = a.wins/a.games;
            let bb = b.wins/b.games;
            if (aa > bb) return -1;
            if (aa < bb) return 1;
            if (a.wins > b.wins) return -1;
            if (a.wins < b.wins) return 1;
            return 0;
        }
        return playerList.sort(rankSort);
    }
    return ( 
        <ScrollableView>
            <LeaderboardTitle title='Rankings based on win ratio'>Leaderboard</LeaderboardTitle>
            <LeaderboardItemsHeader />
            {
                playerRankings().map((player, index) => (
                    <LeaderboardItem rank={index + 1} player={player} key={player.id} />
                ))
            }
        </ScrollableView>
    );
}
const LeaderboardTitle = styled('h1')`
    font-size: 1.25rem;
    margin: .5em 0em .5em 0em;
`;
const LeaderboardItemsHeader = () => (
    <LeaderboardItemContainer>
        <LeaderboardItemHeader>#</LeaderboardItemHeader>
        <LeaderboardItemHeader>Name</LeaderboardItemHeader>
        <LeaderboardItemHeader>W</LeaderboardItemHeader>
        <LeaderboardItemHeader>G</LeaderboardItemHeader>
    </LeaderboardItemContainer>
)
const LeaderboardItem = ({ rank, player }) => (
    <LeaderboardItemContainer>
        <LeaderboardItemText>{rank}.</LeaderboardItemText>
        <LeaderboardItemText>{player.name}</LeaderboardItemText>
        <LeaderboardItemText>{player.wins}</LeaderboardItemText>
        <LeaderboardItemText>{player.games}</LeaderboardItemText>
    </LeaderboardItemContainer>
)
const LeaderboardItemContainer = styled('div')`
    width: 100%;
    padding: .5em;
    display: grid;
    grid-template-columns: 10% 1fr 12% 12%;
    border-bottom: 1px solid #ddd;
`;
const LeaderboardItemHeader = styled('div')`
    font-size: .6rem;
    color: #333;
    font-weight: 700;
`;
const LeaderboardItemText = styled('div')`
    font-size: .85rem;
    color: #333;
`;
 
export default Leaderboard;