import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import styled from 'styled-components';
import Logo from '../logo.png';

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center;
    height: 100vh;
`;

const LogoImage = styled.img`
    width: 500px;
    height: auto;
    margin-right: 200px;
`;


function RegisterPage() {
    return (
        <RegisterContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LogoImage src={Logo} alt="Logo" />
                <RegistrationForm />
            </div>
        </RegisterContainer>
    );
}

export default RegisterPage;
