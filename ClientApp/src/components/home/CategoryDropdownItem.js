import { React, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './css/CategoryDropdownItem.module.css';

export function CategoryDropdownItem({ user, trackProgress, tutorial, displayTutorial, selectedTutorial, setSelectedTutorial, handleRemoveTutorial }) {
    const navigate = useNavigate();
    const location = useLocation();

    function handleSelect() {
        displayTutorial(tutorial);
        navigate("?tutorialId=" + tutorial.tutorialId);
        const nextTutorial = selectedTutorial === tutorial ? null : tutorial
        setSelectedTutorial(nextTutorial);

        if (nextTutorial === null) {
            sessionStorage.removeItem('currentTutorial');
            window.location.reload();
        }
    }

    function displayCompletion() {
        if (!trackProgress || user.completeTutorials.find(x => x.tutorialId === tutorial.tutorialId) === undefined) {
            return null;
        }

        return (
            <i className={`far fa-fw fa-check-circle ${styles.completed}`}></i>
        );
    }

    const selectedClass = selectedTutorial !== null ? 
        (selectedTutorial.tutorialId === tutorial.tutorialId ? `${styles.active}` : "") : "";

    return (
        <div key={tutorial.tutorialId} className={`${styles.title} ${selectedClass}`} onClick={() => handleSelect()}>{tutorial.title}{displayCompletion()}{location.pathname === "/EditorPanel" && <i className={`fa fa-fw fa-times ${styles.delete}`} onClick={() => handleRemoveTutorial(tutorial)} />}</div>
    );
}