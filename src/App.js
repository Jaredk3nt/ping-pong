import React, { Component } from 'react';
import { css } from 'emotion';
// Components
import ScrollableView from './components/ScrollableView';
import { ContentCard, ContentCardText, ContentCardFooter } from './components/ContentCard';
// Variables
const navHeight = '3em';

class App extends Component {
  render() {
    return (
        <React.Fragment>
                <div className={navbar}></div>
                <div className={pageBody}>
                    <div className={content}>
                        <h1>Hi</h1>
                    </div>
                    <ScrollableView>
                        {
                            Array.from('x'.repeat(100)).map(() => (
                                <ContentCard>
                                    <ContentCardText>
                                        Hello!
                                    </ContentCardText>
                                    <ContentCardFooter>
                                        <button>Press me</button>
                                    </ContentCardFooter>
                                </ContentCard>
                            ))
                        }
                    </ScrollableView>
                </div>
        </React.Fragment>
    );
  }
}

// Styles
const navbar = css`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${navHeight};
    background-color: red;
`;
const pageBody = css`
    width: 100vw;
    height: 100vh;
    padding-top: ${navHeight};
    display: grid;
    grid-template-columns: 1fr 25%;
    box-sizing:border-box;
`;
const content = css`
    width: 100%;
    height: 100%;
`;

export default App;
