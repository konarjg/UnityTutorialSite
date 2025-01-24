export function useMovableParagraphs(tutorial, setTutorial) {
    function move(paragraph, direction) {
        var state = { ...tutorial };
        var list = state.paragraphs;

        var index = list.findIndex(item => item.paragraphId === paragraph.paragraphId);

        if (index + direction < 0 || index + direction >= list.length) {
            return;
        }

        var temp = list[index];
        list[index] = list[index + direction];
        list[index + direction] = temp;

        state.paragraphs = list;

        setTutorial(state);
    }

    return { move };
}