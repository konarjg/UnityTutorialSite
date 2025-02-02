import { React, useState, useRef, forwardRef } from 'react';
import styles from './LoginForm.module.css';

export const ForgotPasswordForm = forwardRef(({ }, ref) => {
    const emailRef = useRef(null);
    const emailErrorRef = useRef(null);
    const emailTooltipRef = useRef(null);

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

    const validateForm = () => {
        if (!validateEmail()) {
            return false;
        }

        return true;
    }

    const remind = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        alert("remind");
    }

    return (
        <div className={styles.main} ref={ref}>
            <h1 className={styles.header}>Password recovery</h1>
            <form className={styles.form}>
                <label className={styles.label}>Provide an email that you used during account creation and the password recovery instructions will be sent to that address!</label>
                <div className={styles.inputContainer}>
                    <input ref={emailRef} type="email" required className={styles.input} onChange={validateEmail} />
                    <span ref={emailErrorRef} className={styles.inputValidation} title="Email must be valid!"></span>
                </div>
                <span ref={emailTooltipRef} className={styles.inputTooltip}>Email must be valid!</span>
 
                <div className={styles.inputContainer}>
                    <button className={styles.submit} onClick={remind}>Recover password</button>
                    <span className={styles.inputValidation}></span>
                </div>

                <div className={styles.inputContainer}>
                    <img className={styles.image} src="password-recovery-methods.jpg" alt="recover" />
                </div>
            </form>
        </div>
    );
});