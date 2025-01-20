import { React } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './Sidebar.css';

export function Sidebar() {
    const [categories, setCategories] = useState([]);

    function toggleMenu(id) {
        var element = document.getElementById(id);
        var content = element.parentElement.parentElement.children[1];

        var collapsed = element.classList.contains("fa-chevron-down");

        if (collapsed) {
            element.classList.remove("fa-chevron-down");
            element.classList.add("fa-chevron-up");
            content.style.height = "30vh";
            content.style.visibility = "visible";
        }
        else {
            element.classList.remove("fa-chevron-up");
            element.classList.add("fa-chevron-down");
            content.style.height = "0vh";
            content.style.visibility = "collapse";
        }
    }

    return (
        <div className='sidebar' id='sidebar'>
            {
                categories.map(x =>
                    <div className="mainCategoryContainer">
                        <div className="mainCategoryTitle">
                            <span className="mainCategory">Programming</span>
                            <i id={'mainCategory' + x.categoryId} className='fa fa-fw fa-chevron-down expand' onClick={(event) => toggleMenu(event.currentTarget.id)} />
                        </div>

                        <div id={'mainCategoryContent' + x.categoryId} className="mainCategoryContent">

                        </div>
                    </div>
                )
            }
           
        </div>
    );
}