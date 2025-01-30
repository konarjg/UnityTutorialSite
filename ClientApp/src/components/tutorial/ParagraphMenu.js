import { React, useEffect, useState } from 'react';
import { DropdownMenu } from './DropdownMenu';
import dropdownStyles from './ParagraphMenu.module.css';

export function ParagraphMenu({ edited, handleToggleEdit, canMove, moveParagraph, removeParagraph, saveParagraph }) {
    const [items, setItems] = useState([
        {
            key: "0",
            title: edited ? "Save" : "Edit",
            icon: edited ? "fa fa-fw fa-floppy-o" : "fa fa-fw fa-pencil-square",
            selectable: false,
            active: true,
            handleSelect: () => handleToggleEdit()
        },
        {
            key: "1",
            title: "Move up",
            icon: "fa fa-fw fa-arrow-up",
            selectable: false,
            active: canMove(1),
            handleSelect: () => moveParagraph(1)
        },
        {
            key: "2",
            title: "Move down",
            icon: "fa fa-fw fa-arrow-down",
            selectable: false,
            active: canMove(-1),
            handleSelect: () => moveParagraph(-1)
        },
        {
            key: "3",
            title: "Remove",
            icon: "fa fa-fw fa-times",
            selectable: false,
            active: true,
            handleSelect: () => removeParagraph()
        },
    ]);

    useEffect(() => {
        setItems(prevItems => prevItems.map(x =>
            x.key === "0" ? {
                ...x,
                title: edited ? "Save" : "Edit",
                icon: edited ? "fa fa-fw fa-floppy-o" : "fa fa-fw fa-pencil-square"
            } : x.key === "1" ? {
                ...x,
                active: canMove(1)
            } : x.key === "2" ? {
                ...x,
                active: canMove(-1)
            } : x
        ))

        if (!edited) {
            saveParagraph();
        }
    }, [edited, canMove]);

    return (
        <DropdownMenu id="test" items={items} styles={dropdownStyles} selectionVisible={false} />
    );
}