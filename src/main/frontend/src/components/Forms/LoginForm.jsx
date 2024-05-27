import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EmptyWindow from '../Basic/EmptyWindow';
import { useNavigate } from "react-router-dom";
import { goToRegistration } from '../../navigation/GoToNav'
import {LoginFormCard} from "../StyledComponents/SpecialComponents";


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
            <LoginFormCard className="form_login" onSubmit={handleSubmit}>
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
            </LoginFormCard>
        </EmptyWindow>
    );
}


export default LoginForm;