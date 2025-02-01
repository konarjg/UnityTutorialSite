import { React, useState, useEffect, forwardRef } from 'react';
import { useDatabase } from '../DatabaseProvider';
import { ParagraphMenu } from './ParagraphMenu';
import styles from './Paragraph.module.css';

export const ImageParagraph = forwardRef(({ paragraph, editorMenu, saveParagraph, canMove, moveParagraph, removeParagraph }, ref) => {
    const [edited, setEdited] = useState(false);
    const [image, setImage] = useState(null);

    const handleToggleEdit = () => {
        setEdited(prev => !prev);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function renderParagraph() {
        if (edited) {
            return (
                <div className={`${styles.content} ${edited ? styles.editable : ""}`}>
                    <input className={styles.imagePicker} type="file" accept="image/*" onChange={handleImageChange} />
                    <img className={styles.image} src={image} alt="paragraph" />
                </div>
            );
        }

        return (
            <img className={image} src={image} alt="paragraph" />
        );
    }

    return (
        <div ref={ref} className={`${styles.main} ${(editorMenu ? styles.editableOutline : "")}`}>
            {editorMenu && <ParagraphMenu edited={edited} handleToggleEdit={handleToggleEdit} saveParagraph={saveParagraph} moveParagraph={(dir) => moveParagraph(paragraph, dir)} canMove={(dir) => canMove(paragraph, dir)} removeParagraph={() => removeParagraph(paragraph)} />}

            {renderParagraph()}
        </div>
    );
});
