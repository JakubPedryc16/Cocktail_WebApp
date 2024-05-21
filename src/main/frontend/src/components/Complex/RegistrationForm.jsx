import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EmptyWindow from '../Basic/EmptyWindow';
import {useNavigate} from "react-router-dom";
function RegistrationForm() {

        const [name, setName] = useState('');
        const [surname, setSurname] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [repeatPassword, setRepeatPassword] = useState('');
        const navigate = useNavigate();


        const [errorMessageEmail, setErrorMessageEmail] = useState('');
        const [errorMessagePassword, setErrorMessagePassword] = useState('');
        const [errorMessageRepeat, setErrorMessageRepeat] = useState('');

        const [errorMessage, setErrorMessage] = useState('');

        function isValidEmail() {
            return !!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i);
        }

        function arePasswordTheSame() {
            return password === repeatPassword;
        }

        function isPasswordStrongEnough() {
            return password.length > 6;
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            let hasError = false;

            setErrorMessageEmail('');
            setErrorMessagePassword('');
            setErrorMessageRepeat('');

            if(!isValidEmail(email)) {
                setErrorMessageEmail('Incorrect email');
                hasError = true;
            }
            if(!isPasswordStrongEnough()) {
                setErrorMessagePassword('Password must be longer than 5 characters');
                hasError = true;
            }
            if(!arePasswordTheSame()) {
                setErrorMessageRepeat('The passwords are not the same');
                hasError = true;
            }
            if(hasError) {
                return;
            }

            try {
                const response = await axios.post("http://localhost:8080/auth/signup",
                    {
                        email,
                        password,
                        name,
                        surname
                    });

                localStorage.setItem('register', "Registered successfully");
                navigate("/login");

            }catch(error) {
                setErrorMessage("registration failed try later");
            }
        }

        return (
        <EmptyWindow>
            <StyledForm className="form_registration" onSubmit={handleSubmit}>

                {(errorMessage !== '') && <b className={errorMessage}>{errorMessage}</b>}
                {(errorMessageEmail !== '') && <b className={errorMessage}>{errorMessageEmail}</b>}

                <div className="mainText">Sign up</div>

                {(errorMessageEmail !== '') && <b className={errorMessage}>{errorMessageEmail}</b>}
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
                {(errorMessagePassword !== '') && <b className={errorMessage}>{errorMessagePassword}</b>}
                <div className="input_field">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="text">Confirm Password</div>

                {(errorMessageRepeat !== '') && <b className={errorMessage}>{errorMessageRepeat}</b>}
                <div className="input_field">
                    <input
                        type="password"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
                <div className="text">Name</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="text">Surname</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <button className="log_in_button" type="submit">
                    Sign up
                </button>
            </StyledForm>
        </EmptyWindow>
        );
}

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    
    .text, .mainText, .input_field, .log_in_button, .signup_link {
        color: rgb(36, 35, 51);
        font-family: 'Roboto', sans-serif;
        margin: 5px;
        text-align: center;
        font-size: 16px;
        width: 100%;
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

export default RegistrationForm;
