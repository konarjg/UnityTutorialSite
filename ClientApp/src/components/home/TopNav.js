import { React, forwardRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/TopNav.module.css';

export const TopNav = forwardRef(({ onClick }, ref) => {
    const navigate = useNavigate();

    const handleToggleSidebar = useCallback(() => {
        onClick();
    }, [onClick]);

    const handleChangeRoute = useCallback((route) => {
        sessionStorage.removeItem('categories');
        sessionStorage.removeItem('currentTutorial');
        navigate(route);
        window.location.reload();
    }, [navigate]);

    return (
        <div className={styles.main} id="topnav" ref={ref}>
            <button onClick={(event) => handleToggleSidebar(event.currentTarget.id)} className={styles.sidebarButton} id="sidebarButton">
                <i className='fa fa-fw fa-bars' />
            </button>

            <button className={styles.title} onClick={() => handleChangeRoute('/')}>Unity Tutorials</button>
            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={() => handleChangeRoute('/Login')}><i className="fa fa-fw fa-user-circle" /> Login</button>
            </div>

        </div>
    );
});