import { React } from 'react';
import { TopNav } from '../home/TopNav';
import { Sidebar } from '../home/Sidebar';
import { TutorialEditor } from './TutorialEditor'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { useMovableParagraphs } from '../hooks/useMovableParagraphs';
import { useDatabase } from '../DatabaseProvider';
import { useLocation } from 'react-router-dom';

import styles from './EditorPanel.module.css';

export function EditorPanel() {
    const topnavRef = useRef(null);
    const sidebarRef = useRef(null);
    const tutorialRef = useRef(null);

    const { user, setUser, categories, setCategories, currentTutorial, setCurrentTutorial } = useDatabase();
    const { toggleSidebar } = useSidebar(categories, currentTutorial, topnavRef, sidebarRef, tutorialRef);
    const { move, canMove, remove } = useMovableParagraphs(currentTutorial, setCurrentTutorial, categories, setCategories);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tutorialId = params.get('tutorialId');

        if (tutorialId) {
            const tutorial = categories.flatMap(x => x.tutorials).find(x => x.tutorialId === parseInt(tutorialId, 10));
            setCurrentTutorial(tutorial);
        }
    }, [location, categories, setCurrentTutorial]);

    return (
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <TutorialEditor editedTutorial={currentTutorial} ref={tutorialRef} move={move} canMove={canMove} remove={remove} />
            </div>
        </div>
    );
}