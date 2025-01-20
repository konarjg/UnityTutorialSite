import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

export function TopNav({ route, onClick }) {
    const navigate = useNavigate();

    return(
        <div className="topnav">
            {
                route === '/Tutorials' &&
                <button onClick={onClick} className="sidebarButton" id="sidebarButton">
                    <i className='fa fa-fw fa-bars' />
                </button>
            }
            
            <button className="title" onClick={() => navigate('/')}>Unity Tutorials</button>
            <div className="buttons">
                <button className="navButton" onClick={() => navigate('/Tutorials')}>Tutorials</button>
                <button className="navButton" onClick={() => navigate('/About')}>About me</button>
                <button className="navButton" onClick={() => navigate('/Login')}><i className="fa fa-fw fa-user-circle" /> Login</button>
            </div>
        </div>
    );
}