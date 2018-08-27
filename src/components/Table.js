import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Table = ({ players, onWin,  }) => {
    return (
        <CenterFlex>

        </CenterFlex>
    )
}

const CenterFlex = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

Table.propTypes = {
    players: PropTypes.shape({
        left: PropTypes.shape({
            player1: PropTypes.string,
            player2: PropTypes.string
        }),
        right: PropTypes.shape({
            player1: PropTypes.string,
            player2: PropTypes.string
        })
    })
}

export default Table;