import { React, useState, useEffect } from 'react';
import { TopNav } from '../home/TopNav';
import { Sidebar } from '../home/Sidebar';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { useDatabase } from '../DatabaseProvider';

import styles from './Login.module.css';

export function ForgotPassword() {
    const topnavRef = useRef(null);
    const sidebarRef = useRef(null);
    const formRef = useRef(null);

    const { user, setUser, categories, setCategories, currentTutorial, setCurrentTutorial } = useDatabase();
    const { toggleSidebar } = useSidebar(categories, currentTutorial, topnavRef, sidebarRef, formRef);

    return (
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <div className={styles.forms} ref={formRef}>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}