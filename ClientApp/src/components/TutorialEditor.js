import { React, forwardRef } from 'react';
import FlipMove from 'react-flip-move';
import { ParagraphEditor } from './ParagraphEditor';
import './TutorialEditor.css';

export const TutorialEditor = forwardRef(({ editedTutorial, move }, ref) => {
    if (editedTutorial === null) {
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
        <div className="tutorialEditor" id="tutorial" ref={ref}>
            <textarea className="tutorialEditorHeader">{editedTutorial.title}</textarea>

            <FlipMove>
            {
                editedTutorial.paragraphs.map(x => (
                    <ParagraphEditor key={x.paragraphId} paragraph={x} move={move} />
                ))
            }
            </FlipMove>

            <button className="addParagraph">Add paragraph</button>
        </div>
    );
});