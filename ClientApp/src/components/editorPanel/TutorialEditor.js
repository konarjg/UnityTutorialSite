import { React, forwardRef, useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import { TextParagraph } from '../tutorial/TextParagraph';
import { CodeParagraph } from '../tutorial/CodeParagraph';
import { ImageParagraph } from '../tutorial/ImageParagraph';
import styles from './TutorialEditor.module.css';

export const TutorialEditor = forwardRef(({ editedTutorial, move, canMove, remove }, ref) => {
    if (editedTutorial === null || editedTutorial === undefined) {
        return (
            <div className={styles.main} ref={ref}>
                <h1 className={styles.title}>Welcome to <b>Editor panel</b>,</h1>
                <p className={styles.paragraph}>
                    Here you can create the tutorials for the users of this site,
                    <br/>
                    Remember to save your work and keep the content clean and organized in small paragraphs.
                    <br />
                    We wish you happy editing!
                </p>

                <img className={styles.image} src="editor.png" />
            </div>
        );
    }

    return (
        <div className={styles.main} ref={ref}>
            <textarea className={styles.title}>{editedTutorial.title}</textarea>

            <FlipMove>
            {
                editedTutorial.paragraphs.map(x => (
                    x.type === "Text" ? (
                        <TextParagraph key={x.paragraphId} editorMenu={true} paragraph={x} saveParagraph={() => { }} moveParagraph={move} canMove={canMove} removeParagraph={remove} />
                    ) :
                    x.type === "Code" ? (
                        <CodeParagraph key={x.paragraphId} editorMenu={true} paragraph={x} saveParagraph={() => { }} moveParagraph={move} canMove={canMove} removeParagraph={remove} />
                    ) : (
                        <ImageParagraph key={x.paragraphId} editorMenu={true} paragraph={x} saveParagraph={() => { }} moveParagraph={move} canMove={canMove} removeParagraph={remove} />
                    )
                ))
            }
            </FlipMove>

            <button className={styles.add}><i className="fa fa-fw fa-plus-square"/> Add paragraph</button>
        </div>
    );
});