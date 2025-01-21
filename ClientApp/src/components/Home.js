import { React } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import { CodeBlock, vs2015 } from 'react-code-blocks';
import './Home.css';

export function Home() {
    const [categories, setCategories] = useState([{ categoryId: 0, title: "Programming", tutorials: [{ tutorialId: 0, title: "Test", paragraphs: [{ paragraphId: 0, type: "Text", content: "This is a test paragraph!" }, { paragraphId:1, type: "Code", content: 'Console.WriteLine("Hello world!");' }] }] }]);
    const [currentTutorial, setCurrentTutorial] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', updateSidebar);

        return () => {
            window.removeEventListener('resize', updateSidebar);
        };
    }, []);

    function renderContent() {
        if (currentTutorial === null) {
            return null;
        }

        const codeStyle = {
            width: '80vw',
            height: 'fit-content',
            fontSize: '36px',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        return (
            currentTutorial.paragraphs.map(x => (
                x.type === "Text" ? (
                    <p key={x.paragraphId} className="paragraph">{x.content}</p>
                ) :
                x.type === "Code" ? (
                    <CodeBlock key={x.paragraphId} customStyle={codeStyle} text={x.content} language="csharp" theme={vs2015} showLineNumbers="true"></CodeBlock>
                ) : (
                    <img key={x.paragraphId} src={x.content} />
                )
            ))
        );
    }

    function updateSidebar() {
        var topnav = document.getElementById("topnav");
        var sidebar = document.getElementById("sidebar");
        var tutorial = document.getElementById("tutorial");

        sidebar.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
        tutorial.style.height = (window.innerHeight - topnav.offsetHeight) + "px";
    }

    function toggleSidebar(buttonId) {
        var sidebar = document.getElementById("sidebar");
        var button = document.getElementById(buttonId);
        var tutorial = document.getElementById("tutorial");

        if (sidebar.style.left === "0vw") {
            button.classList.remove("active");
        }
        else {
            button.classList.add("active");
        }

        updateSidebar();
        tutorial.style.marginLeft = sidebar.style.left === "0vw" ? "0vw" : sidebar.offsetWidth + "px";
        tutorial.style.width = sidebar.style.left === "0vw" ? "100vw" : (window.innerWidth - sidebar.offsetWidth) + "px";
        sidebar.style.left = sidebar.style.left === "0vw" ? "-100vw" : "0vw";
    }

    return(
        <div className="main">
            <TopNav onClick={toggleSidebar} />

            <div className="content">
                <Sidebar categories={categories} displayTutorial={(tutorial) => setCurrentTutorial(tutorial)} />
                <div className="tutorial" id="tutorial">
                    {
                        renderContent()
                    }
                </div>
            </div>
        </div>
    );
}