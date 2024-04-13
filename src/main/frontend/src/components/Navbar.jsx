import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: rgb(0, 130, 120);
    color: white;
`;

const Logo = styled.div`
    font-size: 24px;
`;

const NavLinks = styled.div`
    display: flex;
`;

const NavLink = styled.a`
    margin-left: 20px;
    text-decoration: none;
    color: white;
    cursor: pointer;
`;

function Navbar() {
    return (
        <NavbarContainer>
            <Logo>Cocktailoo</Logo>
            <NavLinks>
                <NavLink>Home</NavLink>
                <NavLink>Cocktails</NavLink>
                <NavLink>About Cocktailoo</NavLink>
                <NavLink>Logout</NavLink>
            </NavLinks>
        </NavbarContainer>
    );
}

export default Navbar;
