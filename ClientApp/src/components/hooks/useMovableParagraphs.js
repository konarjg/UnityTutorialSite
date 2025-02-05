import { useEffect } from 'react';

export function useMovableParagraphs(tutorial, setTutorial, categories, setCategories) {
    function canMove(paragraph, direction) {
        var newCategories = [...categories];
        var category = newCategories.find(x => x.categoryId === tutorial.categoryId);
        var tutorials = [...category.tutorials];
        var state = tutorials.find(x => x.tutorialId === tutorial.tutorialId);

        if (state === undefined) {
            return false;
        }

        var list = [...state.paragraphs];

        var index = list.findIndex(item => item.paragraphId === paragraph.paragraphId);

        if (index - direction < 0 || index - direction >= list.length) {
            return false;
        }

        return true;
    }

    function move(paragraph, direction) {
        var newCategories = [...categories];
        var category = newCategories.find(x => x.categoryId === tutorial.categoryId);
        var tutorials = [...category.tutorials];
        var state = tutorials.find(x => x.tutorialId === tutorial.tutorialId);

        var list = [...state.paragraphs];

        var index = list.findIndex(item => item.paragraphId === paragraph.paragraphId);

        if (index - direction < 0 || index - direction >= list.length) {
            return;
        }

        [list[index], list[index - direction]] = [list[index - direction], list[index]];

        state.paragraphs = list;
        tutorials = tutorials.map(x => x.tutorialId === tutorial.tutorialId ? state : {...x});
        category.tutorials = tutorials;
        newCategories = newCategories.map(x => x.categoryId === tutorial.categoryId ? category : {...x});

        setTutorial(state);
        setCategories(newCategories);
    }

    function remove(paragraph) {
        var newCategories = [...categories];
        var category = newCategories.find(x => x.categoryId === tutorial.categoryId);
        var tutorials = [...category.tutorials];
        var state = tutorials.find(x => x.tutorialId === tutorial.tutorialId);

        var list = [...state.paragraphs];

        var index = list.findIndex(item => item.paragraphId === paragraph.paragraphId);
        list.splice(index, 1);

        state.paragraphs = list;
        tutorials = tutorials.map(x => x.tutorialId === tutorial.tutorialId ? state : { ...x });
        category.tutorials = tutorials;
        newCategories = newCategories.map(x => x.categoryId === tutorial.categoryId ? category : { ...x });

        setTutorial(state);
        setCategories(newCategories);
    }

    return { move, canMove, remove };
}