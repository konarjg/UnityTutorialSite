import { React, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Sidebar.module.css';

export const Sidebar = forwardRef(({ categories, canEdit, displayTutorial }, ref ) => {
    const navigate = useNavigate();

    function selectTutorial(categoryId, tutorialId) {
        var tutorial = categories[categoryId].tutorials[tutorialId];
        displayTutorial(tutorial);
        navigate("?tutorialId=" + tutorial.tutorialId);
    }

    function changeRoute(route) {
        sessionStorage.removeItem('categories');
        sessionStorage.removeItem('currentTutorial');
        navigate(route);
        window.location.reload();
    }

    function toggleMenu(id) {
        var element = document.getElementById(id).parentElement;
        var chevron = element.children[0].children[1];
        var content = element.children[1];
        var collapsed = chevron.classList.contains("fa-chevron-down");

        if (collapsed) {
            chevron.classList.remove("fa-chevron-down");
            chevron.classList.add("fa-chevron-up");
            const height = content.scrollHeight + 'px';
            content.style.height = height;
            content.style.visibility = "visible";
        }
        else {
            chevron.classList.remove("fa-chevron-up");
            chevron.classList.add("fa-chevron-down");
            content.style.height = "0vh";
            content.style.visibility = "collapse";
        }
    }

    return (
        <div className={styles.sidebar} id='sidebar' ref={ref}>
            <div className={styles.navigation} >
                <div className={styles.navigationButton} onClick={() => changeRoute('/')}>Home</div>
                <div className={styles.navigationButton} onClick={() => changeRoute('/About')}>About me</div>
                {canEdit && <div className={styles.navigationButton} onClick={() => changeRoute('/EditorPanel')}>Editor panel</div>}
            </div>

            {
                categories.map(x =>
                    <div key={x.categoryId} className={styles.mainCategoryContainer}>
                        <div className={styles.mainCategoryTitle} id={x.categoryId} onClick={(event) => toggleMenu(event.currentTarget.id)}>
                            <span className={styles.mainCategory}>{x.title}</span>
                            <i id={'mainCategory' + x.categoryId} className={`fa fa-fw fa-chevron-down ${styles.expand}`} />
                        </div>

                        <div id={x.categoryId} className={styles.mainCategoryContent}>
                            {
                                x.tutorials.map(y =>
                                    <div className={styles.tutorialTitle} onClick={() => selectTutorial(x.categoryId, y.tutorialId)}>{y.title}</div>
                                )
                            }
                        </div>
                    </div>
                )
            }
           
        </div>
    );
});