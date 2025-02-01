import { React, forwardRef } from 'react';
import { CodeBlock, vs2015 } from 'react-code-blocks';
import styles from './css/Tutorial.module.css';
import { TextParagraph } from '../tutorial/TextParagraph';
import { CodeParagraph } from '../tutorial/CodeParagraph';

export const Tutorial = forwardRef(({ currentTutorial }, ref) => {
    if (currentTutorial === null) {
        return (
            <div className={styles.main} ref={ref}>
                <h1 className={styles.header}>Welcome to Unity Tutorials!</h1>
                <p className={styles.paragraph}>
                    If <i>You</i> wish to learn game development using <b>Unity Engine</b> in a simple and effective way, this site is exactly for <i>You</i>!
                    <br />
                    Select from multiple categories from general programming in <b>C#</b> to complex <b>Unity</b> concepts.
                    <br />
                    Learn as <i>You</i> go, tracking progress is available for users who created an account making the learning flawless.
                    <br />
                    Learn at personal pace and only the topics desired to learn. Whether a beginner, middle skilled or an expert <i>You</i> will definitely find something new to learn on this site.
                    <br />
                    Subscribe to our newsletter in the account panel to receive updates on new content!
                    <br />
                    Click the <b>Login button</b> in the <b>top right corner</b> of the site to create <i>Your</i> account and start learning today!
                    <br />
                    We wish <i>You</i> a great journey with game development and programming.   
                    <br />
                    <b>Happy coding!</b>
                </p>

                <img className={styles.image} src="unity-t2.jpg" />
            </div>
        );
    }

    return (
        <div className={styles.main} ref={ref}>
            <p className={styles.header}>{currentTutorial.title}</p>

            {
                currentTutorial.paragraphs.map(x => (
                    x.type === "Text" ? (
                        <TextParagraph key={x.paragraphId} editorMenu={false} paragraph={x} saveParagraph={() => { }} />
                    ) :
                    x.type === "Code" ? (
                        <CodeParagraph key={x.paragraphId} editorMenu={false} paragraph={x} saveParagraph={() => { }} />
                    ) : (
                        <img key={x.paragraphId} src={x.content} />
                    )
                ))
            }
        </div>
    );
});