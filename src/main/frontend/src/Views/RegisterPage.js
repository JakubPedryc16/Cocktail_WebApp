import React from 'react';
import RegistrationForm from '../components/Forms/RegistrationForm';
import {ColumnContainer, LogoImage} from "../components/StyledComponents/RegularComponents";

function RegisterPage() {
    return (
        <ColumnContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LogoImage src={"../logo.png"} alt="Logo" />
                <RegistrationForm />
            </div>
        </ColumnContainer>
    );
}
export default RegisterPage;
