    import React from 'react';
    import LoginForm from '../components/LoginForm';
    import styled from 'styled-components';
    import Logo from '../logo.png';

    const LoginContainer = styled.div`
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

    function LoginPage() {
        return (
            <LoginContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LogoImage src={Logo} alt="Logo" />
                    <LoginForm />
                </div>
            </LoginContainer>
        );
    }

    export default LoginPage;
