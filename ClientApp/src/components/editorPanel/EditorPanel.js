import { React } from 'react';
import { TopNav } from '../home/TopNav';
import { Sidebar } from '../home/Sidebar';
import { TutorialEditor } from './TutorialEditor'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { useMovableParagraphs } from '../hooks/useMovableParagraphs';
import { useDatabase } from '../DatabaseProvider';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './EditorPanel.module.css';

export function EditorPanel() {
    const topnavRef = useRef(null);
    const sidebarRef = useRef(null);
    const tutorialRef = useRef(null);

    const { user, setUser, categories, setCategories, currentTutorial, setCurrentTutorial } = useDatabase();
    const { toggleSidebar } = useSidebar(categories, currentTutorial, topnavRef, sidebarRef, tutorialRef);
    const { move, canMove, remove } = useMovableParagraphs(currentTutorial, setCurrentTutorial, categories, setCategories);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tutorialId = params.get('tutorialId');

        if (tutorialId) {
            const tutorial = categories.flatMap(x => x.tutorials).find(x => x.tutorialId === parseInt(tutorialId, 10));
            setCurrentTutorial(tutorial);
        }
    }, [location, categories, setCurrentTutorial]);


    function handleAddCategory() {
        const state = [...categories];
        var last = state[state.length - 1];

        if (last === undefined) {
            last = { categoryId: -1 };
        }

        state.push({ categoryId: last.categoryId + 1, title: "New Category", tutorials: [] });

        setCategories(state);
    }

    function handleRemoveCategory(category) {
        var result = window.confirm("Do you really want to delete this category?");

        if (result) {
            const state = [...categories];
            const index = state.findIndex(x => x.categoryId === category.categoryId);
            state.splice(index, 1);

            setCategories([...state]);

            if (currentTutorial !== null) {
                navigate("/EditorPanel");
                setCurrentTutorial(null);
            }
        }
    }

    function handleAddTutorial(category) {
        const state = [...categories];
        const last = state.flatMap(x => x.tutorials).reduce((max, x) => {
            return x.tutorialId > max.tutorialId ? x : max;
        }, { tutorialId: -1 });

        const newCategory = state.find(x => x.categoryId === category.categoryId);
        const newTutorials = [...newCategory.tutorials];

        newTutorials.push({ tutorialId: last.tutorialId + 1, categoryId: category.categoryId, title: "New Tutorial", paragraphs: [] });
        newCategory.tutorials = [...newTutorials];

        const index = state.findIndex(x => x.categoryId === category.categoryId);
        state[index] = { ...newCategory };

        setCategories(state);
    }

    function handleRemoveTutorial(tutorial) {
        var result = window.confirm("Do you really want to remove this tutorial?");

        if (result) {
            const state = [...categories];
            const newCategory = state.find(x => x.categoryId === tutorial.categoryId);
            const categoryIndex = state.findIndex(x => x.categoryId === tutorial.categoryId);
            const newTutorials = [...newCategory.tutorials];
            const index = newTutorials.findIndex(x => x.tutorialId === tutorial.tutorialId);

            newTutorials.splice(index, 1);
            newCategory.tutorials = [...newTutorials];
            state[categoryIndex] = { ...newCategory };

            if (currentTutorial !== null && currentTutorial !== undefined && currentTutorial.tutorialId === tutorial.tutorialId) {
                navigate("/EditorPanel");
                setCurrentTutorial(null);
            }

            setCategories([...state]);
        }
    }

    function handleAddParagraph(paragraph) {
        const state = [...categories];
        const tutorial = state.flatMap(x => x.tutorials).find(x => x.tutorialId === paragraph.tutorialId);
        const index = state.findIndex(x => x.categoryId === tutorial.categoryId);
        const category = { ...state[index] };

        const paragraphs = [...tutorial.paragraphs];
    }

    return (
        <div className={styles.main}>
            <TopNav onClick={toggleSidebar} ref={topnavRef} />

            <div className={styles.content}>
                <Sidebar user={user} categories={categories} handleRemoveTutorial={handleRemoveTutorial} handleAddTutorial={handleAddTutorial} handleRemoveCategory={handleRemoveCategory} handleAddCategory={handleAddCategory} canEdit={user.editor} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} ref={sidebarRef} />
                <TutorialEditor editedTutorial={currentTutorial} ref={tutorialRef} move={move} canMove={canMove} remove={remove} />
            </div>
        </div>
    );
}