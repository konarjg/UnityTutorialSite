import { React, useState, useEffect, forwardRef } from 'react';
import { useDatabase } from '../DatabaseProvider';
import { ParagraphMenu } from './ParagraphMenu';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from './Paragraph.module.css';

export const CodeParagraph = forwardRef(({ paragraph, editorMenu, saveParagraph, moveParagraph, canMove, removeParagraph }, ref) => {
    const [edited, setEdited] = useState(false);

    const handleToggleEdit = () => {
        setEdited(prev => !prev);
    }

    function renderParagraph() {
        const styleTest = {
            width: "99%",
            height: "fit-content",
            margin: "auto",
            marginBottom: "0.5vh",
            whiteSpace: "break-spaces",
            wordWrap: "break-word",
            fontSize: "14px",
            lineHeight: "1.6",
            "@media (min-width: 576px)": {
                fontSize: "16px"
            },
            "@media (min-width: 768px)": {
                fontSize: "18px"
            },
            "@media (min-width: 992px)": {
                fontSize: "20px"
            },
            "@media (min-width: 1200px)": {
                fontSize: "22px"
            },
            "@media (min-width: 1400px)": {
                fontSize: "24px"
            },
        }

        return (
            <CodeEditor style={styleTest} language={"csharp"} readOnly={!edited} value={paragraph.content} />
        );
    }

    return (
        <div ref={ref} className={`${styles.main} ${(editorMenu ? styles.editableOutline : "")}`}>
            {editorMenu && <ParagraphMenu edited={edited} handleToggleEdit={handleToggleEdit} saveParagraph={saveParagraph} moveParagraph={(dir) => moveParagraph(paragraph, dir)} canMove={(dir) => canMove(paragraph, dir)} removeParagraph={() => removeParagraph(paragraph)} />}

            {renderParagraph()}
        </div>
    );
});