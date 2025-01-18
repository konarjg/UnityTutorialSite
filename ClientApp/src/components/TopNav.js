import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

export function TopNav() {
    const navigate = useNavigate();

    return(
        <div className="topnav">
            <div className="title">Unity Tutorials</div>
            <div className="buttons">
                <button className="navButton" onClick={() => navigate('/')}>Home</button>
                <button className="navButton" onClick={() => navigate('/Tutorials')}>Tutorials</button>
                <button className="navButton" onClick={() => navigate('/About')}>About me</button>
            </div>
        </div>
    );
}