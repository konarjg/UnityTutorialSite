import { React, useState, useEffect, forwardRef } from 'react';
import { useDatabase } from '../DatabaseProvider';
import { ParagraphMenu } from './ParagraphMenu';
import styles from './Paragraph.module.css';

export const TextParagraph = forwardRef(({ paragraph, editorMenu, saveParagraph, canMove, moveParagraph, removeParagraph }, ref) => {
    const [edited, setEdited] = useState(false);

    const handleToggleEdit = () => {
        setEdited(prev => !prev);
    }

    function renderParagraph() {
        return (
            <div className={`${styles.content} ${edited ? styles.editable : ""}`} contentEditable={edited}>{paragraph.content}</div>
        );
    }

    return (
        <div ref={ref} className={`${styles.main} ${(editorMenu ? styles.editableOutline : "")}`}>
            {editorMenu && <ParagraphMenu edited={edited} handleToggleEdit={handleToggleEdit} saveParagraph={saveParagraph} moveParagraph={(dir) => moveParagraph(paragraph, dir)} canMove={(dir) => canMove(paragraph, dir)} removeParagraph={() => removeParagraph(paragraph)} />}

            {renderParagraph()}
        </div>
    );
});
