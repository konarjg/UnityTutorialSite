import { React, useState, useRef, forwardRef } from 'react';
import styles from './LoginForm.module.css';

export const LoginForm = forwardRef(({ }, ref) => {
    const credentialRef = useRef(null);
    const credentialErrorRef = useRef(null);
    const credentialTooltipRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordErrorRef = useRef(null);
    const passwordTooltipRef = useRef(null);

    const validateCredential = () => {
        const credential = credentialRef.current;
        const error = credentialErrorRef.current;
        const tooltip = credentialTooltipRef.current;

        if (credential.checkValidity()) {
            error.title = "";
            tooltip.style.display = "none";
            return true;
        } else {
            error.title = "Email or username is required!";
            tooltip.style.display = "inline-block";
            return false;
        }
    }

    const validatePassword = () => {
        const password = passwordRef.current;
        const error = passwordErrorRef.current;
        const tooltip = passwordTooltipRef.current;

        if (password.checkValidity()) {
            error.title = "";
            tooltip.style.display = "none";
            return true;
        } else {
            error.title = "Password is required!";
            tooltip.style.display = "inline-block";
            return false;
        }
    }

    const validateForm = () => {
        if (!validateCredential() || !validatePassword()) {
            return false;
        }

        return true;
    }

    const login = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        alert("login");
    }

    return (
        <div className={styles.main} ref={ref}>
            <h1 className={styles.header}>Log In</h1>
            <form className={styles.form}>
                <label className={styles.label}>Email or username</label>
                <div className={styles.inputContainer}>
                    <input ref={credentialRef} type="text" required className={styles.input} onChange={validateCredential} />
                    <span ref={credentialErrorRef} className={styles.inputValidation} title="Email or username is required!"></span>
                </div>
                <span ref={credentialTooltipRef} className={styles.inputTooltip}>Email or username is required!</span>
                <label className={styles.label}>Password</label>
                <div className={styles.inputContainer}>
                    <input ref={passwordRef} required type="password" className={styles.input} onChange={validatePassword}/>
                    <span ref={passwordErrorRef} className={styles.inputValidation} title="Password is required!"></span>
                </div>
                <span ref={passwordTooltipRef} className={styles.inputTooltip}>Password is required!</span>
                <a href="/ForgotPassword" className={styles.forgotLink}>Forgot password</a>
                <div className={styles.inputContainer}>
                    <button className={styles.submit} onClick={login}>Login</button>
                    <span className={styles.inputValidation}></span>
                </div>
            </form>
        </div>
    );
});