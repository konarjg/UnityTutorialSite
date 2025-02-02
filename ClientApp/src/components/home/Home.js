import { React, useEffect } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { Tutorial } from './Tutorial'
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { useDatabase } from '../DatabaseProvider';
import { useLocation } from 'react-router-dom';

import styles from './css/Home.module.css';

export function Home() {
    const location = useLocation();
    const topnavRef = useRef(null);
    const sidebarRef = useRef(null);
    const tutorialRef = useRef(null);

    const { user, setUser, categories, setCategories, currentTutorial, setCurrentTutorial } = useDatabase();
    const { toggleSidebar } = useSidebar(categories, currentTutorial, topnavRef, sidebarRef, tutorialRef);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tutorialId = params.get('tutorialId');

        if (tutorialId) {
            const tutorial = categories.flatMap(x => x.tutorials).find(x => x.tutorialId === parseInt(tutorialId, 10));
            setCurrentTutorial(tutorial);
        }

    }, [location, categories, setCurrentTutorial]);

    return(
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <Tutorial currentTutorial={currentTutorial} ref={tutorialRef}/>
            </div>
        </div>
    );
}