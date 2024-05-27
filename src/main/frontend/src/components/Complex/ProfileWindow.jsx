import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const ProfileForm = () => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userSurname, setUserSurname] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorized');
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:8080/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setUserName(response.data.userName);
                setUserSurname(response.data.userSurname);
                setUserEmail(response.data.userEmail);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <LoadingStyle>Loading...</LoadingStyle>;
    }

    if (!user) {
        return <NotFoundStyle>Not Found</NotFoundStyle>;
    }

    return (
        <ProfileContainer>
            <ProfileItem>
                <Label>Email:</Label> {userEmail}
            </ProfileItem>
            <ProfileItem>
                <Label>Name:</Label> {userName}
            </ProfileItem>
            <ProfileItem>
                <Label>Surname:</Label> {userSurname}
            </ProfileItem>
        </ProfileContainer>
    );
};

export default ProfileForm;

const ProfileContainer = styled.div`
    background-color: #2c3e50;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: start;
    height: auto;
    width: 60%;
    margin: 5% auto;
    color: #ecf0f1;
    font-size: 24px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ProfileItem = styled.div`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

const Label = styled.span`
    color: #95a5a6;
    font-size: 20px;
    margin-right: 10px;
`;

const NotFoundStyle = styled.div`
    color: #e74c3c;
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
`;

const LoadingStyle = styled.div`
    color: #3498db;
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
`;
