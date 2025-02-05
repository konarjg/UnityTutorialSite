import { React, forwardRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryDropdown } from './CategoryDropdown';
import styles from './css/Sidebar.module.css';

export const Sidebar = forwardRef(({ user, categories, canEdit, handleRemoveTutorial, handleAddTutorial, handleAddCategory, handleRemoveCategory, displayTutorial }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    function handleChangeRoute(route) {
        navigate(route);
        window.location.reload();
    }

    return (
        <div className={styles.sidebar} ref={ref}>
            <div className={styles.navigation} >
                <div className={styles.navigationButton} onClick={() => handleChangeRoute('/')}>Home</div>
                <div className={styles.navigationButton} onClick={() => handleChangeRoute('/About')}>About me</div>
                {canEdit && <div className={styles.navigationButton} onClick={() => handleChangeRoute('/EditorPanel')}>Editor panel</div>}
            </div>

            {
                categories.map(category =>
                    <CategoryDropdown user={user} canEdit={canEdit} handleRemoveTutorial={handleRemoveTutorial} handleAddTutorial={handleAddTutorial} handleRemoveCategory={handleRemoveCategory} trackProgress={!canEdit} key={category.categoryId} category={category} displayTutorial={displayTutorial} />
                )
            }

            {
                location.pathname === "/EditorPanel" && <div className={`${styles.navigationButton} ${styles.add}`} onClick={handleAddCategory}><i className="fa fa-fw fa-plus" /> Add Category</div>
            }
           
        </div>
    );
});