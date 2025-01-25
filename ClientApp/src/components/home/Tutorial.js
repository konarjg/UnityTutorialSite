import { React, forwardRef } from 'react';
import { CodeBlock, vs2015 } from 'react-code-blocks';
import styles from './css/Tutorial.module.css';

export const Tutorial = forwardRef(({ currentTutorial }, ref) => {
    if (currentTutorial === null) {
        return (
            <div className="tutorial" id="tutorial" ref={ref}></div>
        );
    }

    const codeStyle = {
        width: '80vw',
        height: 'fit-content',
        fontSize: '16px',
        marginLeft: 'auto',
        marginRight: 'auto',

        "@media (min-width: 576px)": {
            fontSize: '16px'
        },

        "@media (min-width: 768px)": {
            fontSize: '18px'
        },

        "@media (min-width: 992px)": {
            fontSize: '20px'
        },

        "@media (min-width: 992px)": {
            fontSize: '22px'
        },

        "@media (min-width: 1200px)": {
            fontSize: '24px'
        },

        "@media (min-width: 1200px)": {
            fontSize: '26px'
        },
    };

    return (
        <div className={styles.main} id="tutorial" ref={ref}>
            <p className={styles.header}>{currentTutorial.title}</p>

            {
                currentTutorial.paragraphs.map(x => (
                    x.type === "Text" ? (
                        <p key={x.paragraphId} className={styles.paragraph}>{x.content}</p>
                    ) :
                    x.type === "Code" ? (
                        <CodeBlock key={x.paragraphId} customStyle={codeStyle} text={x.content} language="csharp" theme={vs2015} showLineNumbers="true" />
                    ) : (
                        <img key={x.paragraphId} src={x.content} />
                    )
                ))
            }
        </div>
    );
});