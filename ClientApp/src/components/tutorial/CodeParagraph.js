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
        return (
            <CodeEditor language={"csharp"} disabled={!edited} value={paragraph.content} />
        );
    }

    return (
        <div ref={ref} className={`${styles.main} ${(editorMenu ? styles.editableOutline : "")}`}>
            {editorMenu && <ParagraphMenu edited={edited} handleToggleEdit={handleToggleEdit} saveParagraph={saveParagraph} moveParagraph={(dir) => moveParagraph(paragraph, dir)} canMove={(dir) => canMove(paragraph, dir)} removeParagraph={() => removeParagraph(paragraph)} />}

            {renderParagraph()}
        </div>
    );
});