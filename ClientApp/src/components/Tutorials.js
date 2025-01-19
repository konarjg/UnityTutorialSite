import { React } from 'react';
import { useState } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import './Tutorials.css';

export function Tutorials() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    function toggleSidebar() {
        setSidebarVisible(!sidebarVisible);
        var button = document.getElementById('sidebarButton');

        if (sidebarVisible) {
            button.style.width = "20vw";
        }
        else {
            button.style.width = "2.75vw";
        }
    }

    return(
        <div className="main">
            <TopNav />
            <div className="subTopbar">
                <div className="sidebarButton" id="sidebarButton">
                    <i className='fa fa-fw fa-bars' onClick={toggleSidebar} />
                    <span id='sidebarTitle'>Tutorials</span>
                </div>
            </div>

            <div className="content">
                <Sidebar />
                <div className="tutorial" id="tutorial">

                </div>
            </div>
        </div>
    );
}