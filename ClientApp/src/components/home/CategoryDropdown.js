import { React, useEffect, useState, useRef } from 'react';
import styles from './css/CategoryDropdown.module.css';
import { CategoryDropdownItem } from './CategoryDropdownItem';
import { DropdownMenu } from '../tutorial/DropdownMenu';
import { useLocation } from 'react-router-dom';

export function CategoryDropdown({ user, category, canEdit, handleRemoveTutorial, handleAddTutorial, handleRemoveCategory, trackProgress, displayTutorial }) {
    const titleRef = useRef(null);
    const chevronRef = useRef(null);
    const contentRef = useRef(null);
    const location = useLocation();

    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        window.addEventListener('mousedown', clearEditing);

        return () => {
            window.removeEventListener('mousedown', clearEditing);
        };
    }, []);

    useEffect(() => {
        if (contentRef.current.style.height !== '0vh' && contentRef.current.style.height !== "") {
            contentRef.current.style.height = "auto";
        }
    }, [category]);

    function clearEditing(event) {
        const title = titleRef.current;

        if (title.contains(event.target)) {
            return;
        }

        title.contentEditable = false;
        setEditing(false);
    }

    function handleToggleMenu() {
        if (editing) {
            return;
        }

        if (category.tutorials.length === 0 && (!canEdit || location.pathname !== "/EditorPanel")) {
            return;
        }

        var collapsed = chevronRef.current.classList.contains("fa-chevron-down");

        if (collapsed) {
            chevronRef.current.classList.remove("fa-chevron-down");
            chevronRef.current.classList.add("fa-chevron-up");
            const height = contentRef.current.scrollHeight + 'px';
            contentRef.current.style.height = height;
            contentRef.current.style.visibility = "visible";
        }
        else {
            chevronRef.current.classList.remove("fa-chevron-up");
            chevronRef.current.classList.add("fa-chevron-down");
            contentRef.current.style.height = "0vh";
            contentRef.current.style.visibility = "collapse";
        }
    }

    function calculateCompletion() {
        var completePercentage = 0.0;

        category.tutorials.forEach(x => {
            completePercentage += user.completeTutorials.find(y => y.tutorialId === x.tutorialId) !== undefined ? 1.0 : 0.0;
        });

        completePercentage /= category.tutorials.length;
        completePercentage *= 100.0;
        completePercentage = Math.round(completePercentage);

        return completePercentage;
    }

    function handleEditTitle() {
        const title = titleRef.current;
        title.style.userSelect = "initial";
        title.contentEditable = true;
        title.style.textOverflow = "initial";
        setEditing(true);

        const onBlur = (event) => {
            title.scrollLeft = '0px';
        };

        const onKeyDown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                title.contentEditable = false;
                title.style.textOverflow = "ellipsis";
                title.removeEventListener('keydown', onKeyDown);
                title.removeEventListener('blur', onBlur);
                setEditing(false);
            }
        }
        title.addEventListener('keydown', onKeyDown);
        title.addEventListener('blur', onBlur);
        title.focus();
    }

    return (
        <div key={category.categoryId} className={styles.main}>
            <div onDoubleClick={handleEditTitle} onClick={() => handleToggleMenu()} className={styles.panel}>
                <span ref={titleRef} className={styles.title}>{category.title}</span>
                {canEdit && location.pathname === "/EditorPanel" && <i className={`fa fa-fw fa-times ${styles.delete}`} onClick={() => handleRemoveCategory(category)} />}
                {(category.tutorials.length !== 0 || (location.pathname === "/EditorPanel" && canEdit)) && <i ref={chevronRef} className={`fa fa-fw fa-chevron-down ${styles.expand}`} />}
                {trackProgress && <span className={styles.completion}>{calculateCompletion()}%</span>}
            </div>

            <div className={styles.content} ref={contentRef}>
                {
                    category.tutorials.map(tutorial =>
                        <CategoryDropdownItem user={user} trackProgress={trackProgress} selectedTutorial={selectedTutorial} setSelectedTutorial={setSelectedTutorial} key={tutorial.tutorialId} tutorial={tutorial} displayTutorial={displayTutorial} handleRemoveTutorial={handleRemoveTutorial} />
                    )
                }

                {canEdit && location.pathname === "/EditorPanel" && <div className={styles.add} onClick={() => { handleAddTutorial(category); contentRef.current.style.height = contentRef.current.scrollHeight + "px"; }}><i className="fa fa-fw fa-plus" /> Add Tutorial</div>}
            </div>
        </div>
    );
}