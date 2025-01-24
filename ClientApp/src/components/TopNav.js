import { React, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

export const TopNav = forwardRef(({ onClick }, ref) => {
    const navigate = useNavigate();

    function toggleSidebar(buttonId) {
        onClick(buttonId);
    }

    return (
        <div className="topnav" id="topnav" ref={ref}>
            <button onClick={(event) => toggleSidebar(event.currentTarget.id)} className="sidebarButton" id="sidebarButton">
                <i className='fa fa-fw fa-bars' />
            </button>

            <button className="title" onClick={() => navigate('/')}>Unity Tutorials</button>
            <div className="navButtons">
                <button className="navButton" onClick={() => navigate('/Login')}><i className="fa fa-fw fa-user-circle" /> Login</button>
            </div>

        </div>
    );
});