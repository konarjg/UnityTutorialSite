import { React, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/CategoryDropdownItem.module.css';

export function CategoryDropdownItem({ tutorial, displayTutorial, selectedTutorial, setSelectedTutorial }) {
    const navigate = useNavigate();
    const title = useRef(null);

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

    const selectedClass = selectedTutorial !== null ? 
        (selectedTutorial.tutorialId === tutorial.tutorialId ? `${styles.active}` : "") : "";

    return (
        <div key={tutorial.tutorialId} className={`${styles.title} ${selectedClass}`} onClick={() => handleSelect()}>{tutorial.title}</div>
    );
}