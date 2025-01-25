import { React, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/TopNav.module.css';

export const TopNav = forwardRef(({ onClick }, ref) => {
    const navigate = useNavigate();

    function toggleSidebar(buttonId) {
        onClick(buttonId);
    }

    function changeRoute(route) {
        sessionStorage.removeItem('categories');
        sessionStorage.removeItem('currentTutorial');
        navigate(route);
        window.location.reload();
    }

    return (
        <div className={styles.main} id="topnav" ref={ref}>
            <button onClick={(event) => toggleSidebar(event.currentTarget.id)} className={styles.sidebarButton} id="sidebarButton">
                <i className='fa fa-fw fa-bars' />
            </button>

            <button className={styles.title} onClick={() => changeRoute('/')}>Unity Tutorials</button>
            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={() => changeRoute('/Login')}><i className="fa fa-fw fa-user-circle" /> Login</button>
            </div>

        </div>
    );
});