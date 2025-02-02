import { useEffect, useCallback } from 'react';

export function useSidebar(categories, currentTutorial, topNavRef, sidebarRef, tutorialRef) {
    const updateSidebar = () => {
        var topnav = topNavRef.current;
        var sidebar = sidebarRef.current;
        var tutorial = tutorialRef.current;

        sidebar.style.top = topnav.offsetHeight + "px";
        tutorial.style.top = topnav.offsetHeight + "px";
        tutorial.style.height = (window.innerHeight - topnav.offsetHeight - 0.02 * window.innerHeight) + "px";
    }

    useEffect(() => {
        window.addEventListener('load', updateSidebar);
        window.addEventListener('resize', updateSidebar);
        window.addEventListener('scroll', updateSidebar);

        return () => {
            window.removeEventListener('resize', updateSidebar);
            window.removeEventListener('load', updateSidebar);
            window.removeEventListener('scroll', updateSidebar);
        };
    }, []);

    function toggleSidebar() {
        if (sidebarRef.current === null || tutorialRef.current === null) {
            return;
        }

        var sidebar = sidebarRef.current;
        var tutorial = tutorialRef.current;
        var open = sidebar.style.left === "0vw";

        updateSidebar();
        tutorial.style.marginRight = "5vw";
        sidebar.style.left = open ? "-100vw" : "0vw";
    }

    return { toggleSidebar };
}