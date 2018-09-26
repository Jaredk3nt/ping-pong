import React from 'react';
import styled from 'react-emotion';

import Button from './Button';
import {
    ContentCard,
    ContentCardBody,
    ContentCardTitle,
    ContentCardFooter,
    ContentCardAction
} from './ContentCard';

const PlayerSelectModal = ({ visible, addPlayer, players }) => {
    return (
        <React.Fragment>
            { 
                visible && (
                    <ModalContainer>
                        <ModalContent>
                            <ScrollableView>
                                {
                                    players.map(player => (
                                        <ContentCard key={player.id}>
                                            <ContentCardBody>
                                                <ContentCardTitle>{player.name}</ContentCardTitle>
                                            </ContentCardBody>
                                            <ContentCardFooter>
                                                <ContentCardAction
                                                    name={player}
                                                    onClick={(e) => addPlayer(player)}>
                                                    Select
                                                </ContentCardAction>
                                            </ContentCardFooter>
                                        </ContentCard>
                                    ))
                                }
                            </ScrollableView>
                        </ModalContent>
                    </ModalContainer>
                )
            } 
        </React.Fragment>
    )
}

const ModalContainer = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: rgba(0,0,0,.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled('div')`
    width: 30%;
    height: 90%;
    padding: 1em;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0px 2px 30px rgba(0,0,0,.3);
    border-radius: 4px;
`;

const ScrollableView = styled('div')`
    height: 100%;
    background-color: #eee;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: .5em 1em 5em 1em;
`;

const Player = ({ name, callback }) => (
    <div>
        <h2>{name}</h2>
        <Button onClick={callback}>Select</Button>
    </div>
)

export default PlayerSelectModal;