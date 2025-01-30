import { React, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryDropdown } from './CategoryDropdown';
import styles from './css/Sidebar.module.css';

export const Sidebar = forwardRef(({ categories, canEdit, displayTutorial }, ref) => {
    const navigate = useNavigate();

    function handleChangeRoute(route) {
        sessionStorage.removeItem('categories');
        sessionStorage.removeItem('currentTutorial');
        navigate(route);
        window.location.reload();
    }

    return (
        <div className={styles.sidebar} id='sidebar' ref={ref}>
            <div className={styles.navigation} >
                <div className={styles.navigationButton} onClick={() => handleChangeRoute('/')}>Home</div>
                <div className={styles.navigationButton} onClick={() => handleChangeRoute('/About')}>About me</div>
                {canEdit && <div className={styles.navigationButton} onClick={() => handleChangeRoute('/EditorPanel')}>Editor panel</div>}
            </div>

            {
                categories.map(category =>
                    <CategoryDropdown key={category.categoryId} category={category} displayTutorial={displayTutorial} />
                )
            }
           
        </div>
    );
});