import { React, useState, useContext, useEffect, createContext } from 'react';

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
    const [user, setUser] = useState({ userId: 0, email: "konarskikrzysztof1@gmail.com", username: "konis", password: "test", editor: true, alerts: false, completeTutorials: [{ tutorialId: 0, categoryId: 0, title: "Test", paragraphs: [{ paragraphId: 0, type: "Text", content: "This is a test paragraph!" }, { paragraphId: 1, type: "Code", content: 'Console.WriteLine("Hello world!");' }] }] });
    const [categories, setCategories] = useState([{ categoryId: 0, title: "Programming", tutorials: [{ tutorialId: 0, categoryId: 0, title: "Test", paragraphs: [{ paragraphId: 0, type: "Text", content: "This is a test paragraph!" }, { paragraphId: 1, type: "Code", content: 'Console.WriteLine("Hello world!");' }] }, { tutorialId: 1, categoryId: 0, title: "Test2", paragraphs: [{ paragraphId: 2, type: "Image", content: 'test.jpg' }] }] }]);
    const [currentTutorial, setCurrentTutorial] = useState(null);

    return (
        <DatabaseContext.Provider value={{ user, setUser, categories, setCategories, currentTutorial, setCurrentTutorial }}>
            {children}
        </DatabaseContext.Provider>

    );
}

export const useDatabase = () => useContext(DatabaseContext);