import { React, forwardRef, useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import { TextParagraph } from '../tutorial/TextParagraph';
import { CodeParagraph } from '../tutorial/CodeParagraph';
import { ImageParagraph } from '../tutorial/ImageParagraph';
import styles from './TutorialEditor.module.css';

export const TutorialEditor = forwardRef(({ editedTutorial, move, canMove, remove }, ref) => {
    if (editedTutorial === null) {
        return (
            <div className={styles.main} ref={ref}></div>
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