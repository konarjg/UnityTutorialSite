import { React } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { TutorialEditor } from './TutorialEditor'
import { useState } from 'react';
import { useRef } from 'react';
import { useSidebar } from './hooks/useSidebar';
import { useMovableParagraphs } from './hooks/useMovableParagraphs';

import './Home.css';

export function EditorPanel() {
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
    const [editedTutorial, setEditedTutorial] = useState(() => {
        const saved = sessionStorage.getItem('editedTutorial');
        return saved !== null ? JSON.parse(saved) : null;
    });

    const { toggleSidebar } = useSidebar(categories, editedTutorial, topnavRef, sidebarRef, tutorialRef);
    const { move } = useMovableParagraphs(editedTutorial, setEditedTutorial);

    return (
        <div className="main">
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className="content">
                <Sidebar categories={categories} canEdit={user.editor} displayTutorial={(tutorial) => setEditedTutorial(tutorial)} ref={sidebarRef} />
                <TutorialEditor editedTutorial={editedTutorial} ref={tutorialRef} move={move} />
            </div>
        </div>
    );
}