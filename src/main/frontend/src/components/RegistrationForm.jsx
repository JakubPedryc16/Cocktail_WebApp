import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EmptyWindow from './EmptyWindow'

const StyledForm = styled.form`
    width: 100%;
    .text, .mainText, .input_field, .log_in_button, .signup_link {
        color: rgb(36, 35, 51);
        font-family: 'Roboto', sans-serif;
        margin: 5px;
        text-align: start;
        font-size: 16px;
    }

    .mainText {
        margin-bottom: 25px;
        font-size: 25px;
        font-weight: bold;
        text-align: center;
    }

    .input_field input {
        width: 85%;
        padding: 10px;
        margin-bottom: 10px;
        border: none;
        border-radius: 5px;
    }

    .log_in_button {
        margin-top: 15px;
        margin-bottom: 30px;
        color: white;
        display: block;
        text-align: center;
        width: 88%;
        padding: 12px;
        font-size: 16px;
        background-color: rgb(36, 35, 51);
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .signup_link {
        display: flex;
        justify-content: flex-start; 
    }
`;

function RegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            console.log('Registration response:', response.data);

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <EmptyWindow>
            <StyledForm className="form_registration" onSubmit={handleSubmit}>
                <div className="mainText">Sign up</div>
                <div className="text">First Name</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="text">Last Name</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="text">Email</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="text">Password</div>
                <div className="input_field">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="text">Confirm Password</div>
                <div className="input_field">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="log_in_button" type="submit">
                    Sign up
                </button>
            </StyledForm>
        </EmptyWindow>
    );
}

export default RegistrationForm;
