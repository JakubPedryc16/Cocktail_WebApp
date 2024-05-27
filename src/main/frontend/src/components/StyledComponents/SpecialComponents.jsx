import styled from "styled-components";

export const LogoAnimated = styled.img`
    width: 600px;
    height: auto;
    position: fixed;
    top: 50%;
    left: 200px;
    transform: translate(0, -50%);
    z-index: 1;
`;

export const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text, .mainText, .input_field, .log_in_button, .signup_link {
        color: rgb(36, 35, 51);
        font-family: 'Roboto', sans-serif;
        margin: 5px;
        text-align: center;
        width: 100%;
        font-size: 16px;
    }

    .mainText {
        margin-bottom: 25px;
        font-size: 25px;
        font-weight: bold;
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

export const LoginFormCard = styled(StyledForm)`
    .text, .mainText, .input_field, .signup_link {
        font-size: 20px;
    }
`;

export const RegisterFormCard = styled(StyledForm)`
    .log_in_button {
        margin: 15px auto 30px auto;
    }
`;

export const DeleteButton = styled.button`
    position: fixed;
    bottom: 50px;

    padding: 15px 80px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 24px;
    &:hover {
        background-color: darkred;
    }
`;

export const ScrollingContainer = styled.div`
    margin: 20px;
    min-height: calc(100vh - 400px);
    padding-bottom: 200px;
    color: white;
    font-family: 'Roboto', sans-serif;
`;