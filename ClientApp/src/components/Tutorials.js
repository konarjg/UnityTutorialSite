import { React } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import './Tutorials.css';

export function Tutorials() {
    function toggleSidebar() {
        var sidebar = document.getElementById("sidebar");
        sidebar.style.left = sidebar.style.left === "0vw" ? "-500px" : "0vw";
    }

    return(
        <div className="main">
            <TopNav route='/Tutorials' onClick={toggleSidebar} />

            <div className="content">
                <Sidebar />
                <div className="tutorial" id="tutorial">

                </div>
            </div>
        </div>
    );
}