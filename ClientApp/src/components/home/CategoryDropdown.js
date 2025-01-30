import { React, useEffect, useState, useRef } from 'react';
import styles from './css/CategoryDropdown.module.css';
import { CategoryDropdownItem } from './CategoryDropdownItem';

export function CategoryDropdown({category, displayTutorial}) {
    const chevron = useRef(null);
    const content = useRef(null);

    const [selectedTutorial, setSelectedTutorial] = useState(() => {
        const saved = sessionStorage.getItem("selectedTutorial" + category.categoryId);
        return saved !== null ? JSON.parse(saved) : null;
    });

    function handleToggleMenu() {
        var collapsed = chevron.current.classList.contains("fa-chevron-down");

        if (collapsed) {
            chevron.current.classList.remove("fa-chevron-down");
            chevron.current.classList.add("fa-chevron-up");
            const height = content.current.scrollHeight + 'px';
            content.current.style.height = height;
            content.current.style.visibility = "visible";
        }
        else {
            chevron.current.classList.remove("fa-chevron-up");
            chevron.current.classList.add("fa-chevron-down");
            content.current.style.height = "0vh";
            content.current.style.visibility = "collapse";
        }
    }

    return (
        <div key={category.categoryId} className={styles.main}>
            <div className={styles.panel} onClick={() => handleToggleMenu()}>
                <span className={styles.title}>{category.title}</span>
                <i ref={chevron} id={"chevron" + category.categoryId} className={`fa fa-fw fa-chevron-down ${styles.expand}`} />
            </div>

            <div className={styles.content} ref={content}>
                {
                    category.tutorials.map(tutorial =>
                        <CategoryDropdownItem selectedTutorial={selectedTutorial} setSelectedTutorial={setSelectedTutorial} key={tutorial.tutorialId} tutorial={tutorial} displayTutorial={displayTutorial} />
                    )
                }
            </div>
        </div>
    );
}