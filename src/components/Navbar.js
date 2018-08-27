import styled from 'react-emotion';
const Navbar = styled('div')`
    background-color: ${props => props.theme.primary};
    color: white;
    width: 100%;
    height: ${props => props.theme.navHeight};
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0em 1em;
    box-sizing: border-box;
` 

export default Navbar;