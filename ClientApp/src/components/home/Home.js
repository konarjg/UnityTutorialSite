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

    function handleMarkCompletion(tutorial, complete) {
        const state = { ...user };
        const completeTutorials = [...user.completeTutorials];

        if (complete) {
            completeTutorials.push({ ...tutorial });
        }
        else {
            const index = completeTutorials.findIndex(x => x.tutorialId === tutorial.tutorialId);
            completeTutorials.splice(index, 1);
        }
        
        state.completeTutorials = completeTutorials;
        setUser(state);
    }

    return(
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar user={user} categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <Tutorial user={user} handleMarkCompletion={handleMarkCompletion} currentTutorial={currentTutorial} ref={tutorialRef} />
            </div>
        </div>
    );
}