import React, { useState } from 'react';
import axios from 'axios';
import EmptyWindow from '../Basic/EmptyWindow';
import {useNavigate} from "react-router-dom";
import {RegisterFormCard} from "../StyledComponents/SpecialComponents";
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
            return password.length >= 5;
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
                setErrorMessagePassword('Password must have be at least 5 characters');
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
                await axios.post("http://localhost:8080/auth/signup",
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
            <RegisterFormCard className="form_registration" onSubmit={handleSubmit}>

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
            </RegisterFormCard>
        </EmptyWindow>
        );
}



export default RegistrationForm;
