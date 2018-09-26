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

const PlayerSelectModal = ({ visible, addPlayer, close, players }) => {
    return (
        <React.Fragment>
            { 
                visible && (
                    <ModalContainer>
                        <ModalContent>
                            <div className='modal-topbar'>
                                <h1>Add Player</h1>
                                <div>
                                    <Button primary>New Player</Button>
                                    <Button onClick={close}>Close</Button>
                                </div>
                            </div>
                            
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
    overflow: hidden;

    .modal-topbar {
        display: flex;
        height: 3.5em;
        padding: 0em 0em .5em 0em;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin: 0;
            font-size: 1.25rem;
        }
    }
   
`;

const ScrollableView = styled('div')`
    background-color: #eee;
    height: calc(100% - 3.5em);
    overflow-y: auto;
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