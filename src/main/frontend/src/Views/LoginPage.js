    import React from 'react';
    import LoginForm from '../components/Forms/LoginForm';
    import {ColumnContainer, LogoImage} from "../components/StyledComponents/RegularComponents";

    function LoginPage() {
        return (
            <ColumnContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LogoImage src={"../logo.png"} alt="Logo" />
                    <LoginForm />
                </div>
            </ColumnContainer>
        );
    }
    export default LoginPage;
