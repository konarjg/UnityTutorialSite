import { React, forwardRef } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './ParagraphEditor.css';

export const ParagraphEditor = forwardRef(({ paragraph, move }, ref) => {
    return (
        <div className="paragraphEditor" key={paragraph.paragraphId} ref={ref}>
            {
                paragraph.type === "Text" ? (
                    <textarea className="textEditor">{paragraph.content}</textarea>
                ) :
                paragraph.type === "Code" ? (
                    <CodeEditor className="codeEditor" code={paragraph.content} language="csharp"/>
                ) :
                (
                    <div className="imageEditor"></div>
                )
            }

            <i className="fa fa-fw fa-arrow-up" onClick={() => move(paragraph, -1)} />
            <i className="fa fa-fw fa-arrow-down" onClick={() => move(paragraph, +1)} />
        </div>
        
    );
});