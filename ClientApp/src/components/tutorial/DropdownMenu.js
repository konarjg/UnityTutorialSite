import { React, useRef, useState, useEffect } from 'react';

export function DropdownMenu({ title, items, styles, multiSelect, selectionVisible }) {
    const [selected, setSelected] = useState([]);
    const content = useRef(null);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function toggleDropdown() {
        const container = content.current;
        const expanded = container.style.height !== "0vh";

        content.current.style.height = expanded ? "0vh" : container.scrollHeight + "px";
        content.current.style.visibility = expanded ? "collapse" : "visible";
    }

    function handleClickOutside(event) {
        if (content.current && !content.current.contains(event.target)) {
            content.current.style.height = "0vh";
            content.current.style.visibility = "collapse";
        }
    }

    function handleSelect(item) {
        item.handleSelect();

        if (item.selectable) {
            var list = [...selected];

            if (list.find(x => x.key == item.key) !== undefined) {
                list.splice(list.findIndex(x => x.key == item.key), 1);
                setSelected(list);
                return;
            }

            if (multiSelect) {
                list.push(item);
            } else {
                list = [item];
            }

            setSelected(list);
            return;
        }
        
        toggleDropdown();
    }

    return (
        <div className={styles.dropdown}>
            <span className={styles.title}><i className={`fa fa-fw fa-bars ${styles.expand}`} onClick={toggleDropdown} /> {title}</span>
            <div ref={content} className={styles.content}>
            {
                    items.map(item => (
                        <div key={item.key} className={`${styles.item} ${(selected.find(x => x.key == item.key && item.selectable) != undefined && selectionVisible ? styles.selected : "")} ${(item.active ? styles.active : "")}`} onClick={() => handleSelect(item)}><i className={item.icon} /> {item.title}</div>
                ))
            }
            </div>
        </div>
    );
    
}