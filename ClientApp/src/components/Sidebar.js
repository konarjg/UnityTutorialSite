import { React, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = forwardRef(({ categories, canEdit, displayTutorial }, ref ) => {
    const navigate = useNavigate();

    function selectTutorial(categoryId, tutorialId) {
        var tutorial = categories[categoryId].tutorials[tutorialId];
        displayTutorial(tutorial);
        navigate("?tutorialId=" + tutorial.tutorialId);
    }

    function changeRoute(route) {
        sessionStorage.clear();
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
        <div className='sidebar' id='sidebar' ref={ref}>
            <div className='navigation'>
                <div className='navigationButton' onClick={() => changeRoute('/')}>Home</div>
                <div className='navigationButton' onClick={() => changeRoute('/About')}>About me</div>
                {canEdit && <div className='navigationButton' onClick={() => changeRoute('/EditorPanel')}>Editor panel</div>}
            </div>

            {
                categories.map(x =>
                    <div key={x.categoryId} className="mainCategoryContainer">
                        <div className="mainCategoryTitle" id={x.categoryId} onClick={(event) => toggleMenu(event.currentTarget.id)}>
                            <span className="mainCategory">{x.title}</span>
                            <i id={'mainCategory' + x.categoryId} className='fa fa-fw fa-chevron-down expand' />
                        </div>

                        <div id={x.categoryId} className="mainCategoryContent">
                            {
                                x.tutorials.map(y =>
                                    <div className='tutorialTitle' onClick={() => selectTutorial(x.categoryId, y.tutorialId)}>{y.title}</div>
                                )
                            }
                        </div>
                    </div>
                )
            }
           
        </div>
    );
});