import { React } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar({ categories, displayTutorial }) {
    const navigate = useNavigate();

    function selectTutorial(categoryId, tutorialId) {
        var tutorial = categories[categoryId].tutorials[tutorialId];
        displayTutorial(tutorial);
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
        <div className='sidebar' id='sidebar'>
            <div className='navigation'>
                <div className='navigationButton' onClick={() => navigate('/')}>Home</div>
                <div className='navigationButton' onClick={() => navigate('/About')}>About me</div>
            </div>

            {
                categories.map(x =>
                    <div key={x.categoryId} className="mainCategoryContainer">
                        <div className="mainCategoryTitle" id={x.categoryId} onClick={(event) => toggleMenu(event.currentTarget.id)}>
                            <span className="mainCategory">{x.title}</span>
                            <i id={'mainCategory' + x.categoryId} className='fa fa-fw fa-chevron-down expand' />
                        </div>

                        <div id={x.categoryId} className="mainCategoryContent">
                            <div className='tutorialTitle' onClick={() => selectTutorial(x.categoryId, x.tutorials[0].tutorialId)}>{x.tutorials[0].title}</div>
                        </div>
                    </div>
                )
            }
           
        </div>
    );
}