import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EmptyWindow from '../Basic/EmptyWindow';
import { useNavigate } from "react-router-dom";
import { goToRegistration } from '../../navigation/GoToNav'


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [signupMessage, setSignupMessage] = useState('');


    useEffect(() => {
        const registerMessage = localStorage.getItem('register');
        if(registerMessage !== null) {
            setSignupMessage(registerMessage);
            localStorage.removeItem('register');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                password: password
            });

            const token = response.data.token;
            const role = response.data.role;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role)

            navigate("/home");

        } catch(error) {
            if(error.response && error.response.status === 403) {
                setErrorMessage('Incorrect username or password');
            }
            else
                setErrorMessage('Login error, try later');
        }
    };

    return (
        <EmptyWindow>
            {(signupMessage !== '') && <b>{signupMessage}</b>}
            {(errorMessage !== '') && <p className={errorMessage}>{errorMessage}</p>}
            <StyledForm className="form_login" onSubmit={handleSubmit}>
                <div className="mainText">Log in</div>
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
                <button className="log_in_button" type="submit">
                    Log in
                </button>
                <div className="mainText">Don't have an account?</div>
                <button className="log_in_button" type="button" onClick={goToRegistration}>
                    Sign In
                </button>
            </StyledForm>
        </EmptyWindow>
    );
}
const StyledForm = styled.form`
    width: 100%;
    .text, .mainText, .input_field, .log_in_button, .signup_link {
        color: rgb(36, 35, 51);
        font-family: 'Roboto', sans-serif;
        margin: 5px;
        text-align: start;
        font-size: 20px;
    }

    .mainText {
        margin-bottom: 30px;
        font-size: 25px;
        font-weight: bold;
        
    }

    .input_field input {
        width: 85%; 
        padding: 10px; 
        margin-bottom: 15px;
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

export default LoginForm;