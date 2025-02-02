import { React, useState, forwardRef, useRef } from 'react';
import styles from './LoginForm.module.css';

export const RegisterForm = forwardRef(({ }, ref) => {
    const emailRef = useRef(null);
    const emailErrorRef = useRef(null);
    const usernameRef = useRef(null);
    const usernameErrorRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const passwordErrorRef = useRef(null);
    const confirmPasswordErrorRef = useRef(null);

    const emailTooltipRef = useRef(null);
    const usernameTooltipRef = useRef(null);
    const confirmPasswordTooltipRef = useRef(null);
    const passwordConditionsRef = useRef(null);

    const validateEmail = () => {
        const email = emailRef.current;
        const error = emailErrorRef.current;
        const tooltip = emailTooltipRef.current;

        if (email.checkValidity()) {
            error.title = "";
            tooltip.style.display = "none";
            return true;
        } else {
            error.title = "Email must be valid!";
            tooltip.style.display = "inline-block";
            return false;
        }
    }

    const validateUsername = () => {
        const username = usernameRef.current;
        const error = usernameErrorRef.current;
        const tooltip = usernameTooltipRef.current;

        if (username.checkValidity()) {
            error.title = "";
            tooltip.style.display = "none";
            return true;
        } else {
            error.title = "Username is required!";
            tooltip.style.display = "inline-block";
            return false;
        }
    }

    const validatePassword = () => {
        const password = passwordRef.current;
        const passwordError = passwordErrorRef.current;

        const conditions = passwordConditionsRef.current.children;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const number = /[0-9]/;
        const special = /[^a-zA-Z0-9]/;

        conditions[0].style.color = password.value.length >= 8 ? "#cfcfcf80" : "#cfcfcf";
        conditions[1].style.color = uppercase.test(password.value) ? "#cfcfcf80" : "#cfcfcf";
        conditions[2].style.color = lowercase.test(password.value) ? "#cfcfcf80" : "#cfcfcf";
        conditions[3].style.color = number.test(password.value) ? "#cfcfcf80" : "#cfcfcf";
        conditions[4].style.color = special.test(password.value) ? "#cfcfcf80" : "#cfcfcf";

        if (password.checkValidity()) {
            passwordError.title = "";
            return true;
        } else {
            passwordError.title = "Password must contain at least 8 characters with at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character!";
            return false;
        }
    }

    const validateConfirmPassword = () => {
        const password = passwordRef.current;
        const confirm = confirmPasswordRef.current;
        const confirmError = confirmPasswordErrorRef.current;
        const tooltip = confirmPasswordTooltipRef.current;

        if (confirm.value === password.value && confirm.value.length !== 0) {
            confirm.setCustomValidity("");
            confirmError.title = "";
            tooltip.style.display = "none";
            return true;
        } else {
            confirm.setCustomValidity("Passwords must match!");
            confirmError.title = "Passwords must match!";
            tooltip.style.display = "inline-block";
            return false;
        }
    }

    const validateForm = () => {
        if (!validateEmail() || !validateUsername() || !validatePassword() || !validateConfirmPassword()) {
            return false;
        }

        return true;
    }

    const register = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        alert("register");
    }

    return (
        <div className={styles.main} ref={ref}>
            <h1 className={styles.header}>Create account</h1>
            <form className={styles.form}>
                <label className={styles.label}>Email</label>
                <div className={styles.inputContainer}>
                    <input ref={emailRef} type="email" className={styles.input} required onChange={validateEmail} />
                    <span ref={emailErrorRef} className={styles.inputValidation} title="Email must be valid!"></span>
                </div>
                <span ref={emailTooltipRef} className={styles.inputTooltip}>Email must be valid!</span>

                <label className={styles.label}>Username</label>
                <div className={styles.inputContainer}>
                    <input ref={usernameRef} required type="text" className={styles.input} onChange={validateUsername} />
                    <span ref={usernameErrorRef} className={styles.inputValidation} title="Username is required!"></span>
                </div>
                <span ref={usernameTooltipRef} className={styles.inputTooltip}>Username is required!</span>

                <label className={styles.label}>Password</label>
                <div className={styles.inputContainer}>
                    <input ref={passwordRef} required type="password" className={styles.input} minLength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>?,./]).{8,}$" onChange={validatePassword} />
                    <span ref={passwordErrorRef} className={styles.inputValidation} title="Password must contain at least 8 characters with at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character!"></span>
                </div>
                <span className={styles.passwordTooltip}>
                    Password must contain at least:
                    <ul ref={passwordConditionsRef}>
                        <li>8 characters</li>
                        <li>1 uppercase letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 number</li>
                        <li>1 special symbol</li>
                    </ul>
                </span>

                <label className={styles.label}>Confirm password</label>
                <div className={styles.inputContainer}>
                    <input ref={confirmPasswordRef} required type="password" className={styles.input} minLength="8" onChange={validateConfirmPassword} />
                    <span ref={confirmPasswordErrorRef} className={styles.inputValidation} title="Passwords must match!"></span>
                </div>
                <span ref={confirmPasswordTooltipRef} className={styles.inputTooltip}>Passwords must match!</span>

                <div className={styles.inputContainer}>
                    <button onClick={register} className={styles.submit}>Register</button>
                    <span className={styles.inputValidation}></span>
                </div>
            </form>
        </div>
    );
});