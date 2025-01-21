import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

export function TopNav({ onClick }) {
    const navigate = useNavigate();

    function toggleSidebar(buttonId) {
        onClick(buttonId);
    }

    return(
        <div className="topnav" id="topnav">
            <button onClick={(event) => toggleSidebar(event.currentTarget.id)} className="sidebarButton" id="sidebarButton">
                <i className='fa fa-fw fa-bars' />
            </button>
            
            <button className="title" onClick={() => navigate('/')}>Unity Tutorials</button>
            <div className="navButtons">
                <button className="navButton" onClick={() => navigate('/Login')}><i className="fa fa-fw fa-user-circle" /> Login</button>
            </div>
            
        </div>
    );
}