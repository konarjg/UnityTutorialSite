import { React, forwardRef } from 'react';
import { CodeBlock, vs2015 } from 'react-code-blocks';
import styles from './css/Tutorial.module.css';
import { TextParagraph } from '../tutorial/TextParagraph';
import { CodeParagraph } from '../tutorial/CodeParagraph';

export const Tutorial = forwardRef(({ currentTutorial }, ref) => {
    if (currentTutorial === null) {
        return (
            <div className="tutorial" id="tutorial" ref={ref}></div>
        );
    }

    return (
        <div className={styles.main} id="tutorial" ref={ref}>
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