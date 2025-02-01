import { useEffect } from 'react';

export function useSidebar(categories, currentTutorial, topNavRef, sidebarRef, tutorialRef) {
    useEffect(() => {
        window.addEventListener('load', updateSidebar);
        window.addEventListener('resize', updateSidebar);
        sessionStorage.setItem('categories', JSON.stringify(categories));
        sessionStorage.setItem('currentTutorial', JSON.stringify(currentTutorial));

        return () => {
            window.removeEventListener('resize', updateSidebar);
            window.removeEventListener('load', updateSidebar);
        };
    }, [categories, currentTutorial]);

    function updateSidebar() {
        var topnav = topNavRef.current;
        var sidebar = sidebarRef.current;
        var tutorial = tutorialRef.current;

        sidebar.style.top = topnav.scrollHeight + "px";
        sidebar.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
        tutorial.style.top = topnav.scrollHeight + "px";
        tutorial.style.height = (window.innerHeight - topnav.offsetHeight - 0.02 * window.innerHeight) + "px";
    }

    function toggleSidebar() {
        if (sidebarRef.current === null || tutorialRef.current === null) {
            return;
        }

        var sidebar = sidebarRef.current;
        var tutorial = tutorialRef.current;
        var open = sidebar.style.left === "0vw";

        updateSidebar();
        tutorial.style.marginLeft = open ? "0vw" : sidebar.offsetWidth + 0.01 * window.innerWidth + "px";
        tutorial.style.marginRight = "5vw";
        tutorial.style.width = open ? "100vw" : (window.innerWidth - sidebar.offsetWidth - 0.01 * window.innerWidth) + "px";
        sidebar.style.left = open ? "-100vw" : "0vw";
    }

    return { toggleSidebar };
}