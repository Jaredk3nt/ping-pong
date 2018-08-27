import PropTypes from 'prop-types';

const PlayerPropType = PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    games: PropTypes.number,
});
const TeamPropType = PropTypes.shape({
    player1: PlayerPropType,
    player2: PlayerPropType,
});

export {
    PlayerPropType,
    TeamPropType,
}