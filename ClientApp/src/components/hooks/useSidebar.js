import { useEffect } from 'react';
import { TopNav } from '../TopNav';

export function useSidebar(categories, currentTutorial, topNavRef, sidebarRef, tutorialRef) {
    useEffect(() => {
        window.addEventListener('resize', updateSidebar);
        sessionStorage.setItem('categories', JSON.stringify(categories));
        sessionStorage.setItem('currentTutorial', JSON.stringify(currentTutorial));

        return () => {
            window.removeEventListener('resize', updateSidebar);
        };
    }, [categories, currentTutorial]);

    function updateSidebar() {
        var topnav = topNavRef.current;
        var sidebar = sidebarRef.current;
        var tutorial = tutorialRef.current;

        sidebar.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
        tutorial.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
    }

    function toggleSidebar(buttonId) {
        if (sidebarRef.current === null || tutorialRef.current === null) {
            return;
        }

        var sidebar = sidebarRef.current;
        var button = document.getElementById(buttonId);
        var tutorial = tutorialRef.current;

        if (sidebar.style.left === "0vw") {
            button.classList.remove("active");
        }
        else {
            button.classList.add("active");
        }

        updateSidebar();
        tutorial.style.marginLeft = sidebar.style.left === "0vw" ? "0vw" : sidebar.offsetWidth + 0.01 * window.innerWidth + "px";
        tutorial.style.marginRight = "5vw";
        tutorial.style.width = sidebar.style.left === "0vw" ? "100vw" : (window.innerWidth - sidebar.offsetWidth - 0.01 * window.innerWidth) + "px";
        sidebar.style.left = sidebar.style.left === "0vw" ? "-100vw" : "0vw";
    }

    return { toggleSidebar };
}