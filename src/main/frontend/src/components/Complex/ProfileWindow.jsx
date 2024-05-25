import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

/**
 * @typedef {Object} UserDto
 * @property {string} userEmail
 * @property {string} userName
 * @property {string} userSurname
 */

const ProfileForm = () => {

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userSurname, setUserSurname] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const response = await axios.get("http://localhost:8080/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setUserName(response.data.userName)
                setUserSurname(response.data.userSurname)
                setUserEmail(response.data.userEmail)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <div>Not Found</div>;
    }

    return (
        <ProfileContainerStyle>
            <ProfileItemStyle>
                <LabelStyle>Email: </LabelStyle> {userEmail}
            </ProfileItemStyle>
            <ProfileItemStyle>
                <LabelStyle>Name:   </LabelStyle> {userName}
            </ProfileItemStyle>
            <ProfileItemStyle>
                <LabelStyle>Surname:</LabelStyle> {userSurname}
            </ProfileItemStyle>
        </ProfileContainerStyle>
    );
};

export default ProfileForm;

const ProfileContainerStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: start;
    height: 20vh;
    color: rgba(255, 255, 255, 0.75);
    font-size: 24px;
    border-radius: 10px;
    box-shadow: black;
`;

const ProfileItemStyle = styled.div`
    width: 400px;
    height: auto;

`;

const LabelStyle = styled.span`
    color: rgba(152, 152, 152, 0.75);
    font-size: 20px;
    margin: 10px;
    margin-left: 15%;

`;

