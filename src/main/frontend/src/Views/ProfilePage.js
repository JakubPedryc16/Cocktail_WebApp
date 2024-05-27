import React from 'react';
import Navbar from '../components/Complex/Navbar';
import EmptyWindow from '../components/Basic/EmptyWindow'
import ProfileWindow from "../components/Complex/ProfileWindow";
import {LogoImage, MainContainer, RowContainer} from "../components/StyledComponents/RegularComponents";

function ProfilePage() {
    return (
        <>
            <Navbar />
            <MainContainer>
                <RowContainer>
                    <LogoImage src={"/../logo.png"} alt="Logo" />
                    <EmptyWindow>
                        <ProfileWindow></ProfileWindow>
                    </EmptyWindow>
                </RowContainer>

            </MainContainer>
        </>
    );
}

export default ProfilePage;

