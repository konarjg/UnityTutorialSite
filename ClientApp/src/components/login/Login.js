import { React, useState, useEffect } from 'react';
import { TopNav } from '../home/TopNav';
import { Sidebar } from '../home/Sidebar';

import styles from './Login.module.css';

export function Login() {
    return (
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <Tutorial currentTutorial={currentTutorial} ref={tutorialRef} />
            </div>
        </div>
    );
}