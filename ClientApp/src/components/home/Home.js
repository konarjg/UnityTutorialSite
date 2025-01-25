import { React } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { Tutorial } from './Tutorial'
import { useState } from 'react';
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import styles from './css/Home.module.css';

export function Home() {
    const topnavRef = useRef(null);
    const sidebarRef = useRef(null);
    const tutorialRef = useRef(null);

    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem('user');
        return saved !== null ? JSON.parse(saved) : { userId: 0, email: "konarskikrzysztof1@gmail.com", username: "konis", password: "test", editor: true, alerts: false, comments: [], completeTutorials: [] };
    });
    const [categories, setCategories] = useState(() => {
        const saved = sessionStorage.getItem('categories');
        return saved !== null ? JSON.parse(saved) : [{ categoryId: 0, title: "Programming", tutorials: [{ tutorialId: 0, title: "Test", paragraphs: [{ paragraphId: 0, type: "Text", content: "This is a test paragraph!" }, { paragraphId: 1, type: "Code", content: 'Console.WriteLine("Hello world!");' }] }] }];
    });
    const [currentTutorial, setCurrentTutorial] = useState(() => {
        const saved = sessionStorage.getItem('currentTutorial');
        return saved !== null ? JSON.parse(saved) : null;
    });

    const { toggleSidebar } = useSidebar(categories, currentTutorial, topnavRef, sidebarRef, tutorialRef);

    return(
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <Tutorial currentTutorial={currentTutorial} ref={tutorialRef} />
            </div>
        </div>
    );
}