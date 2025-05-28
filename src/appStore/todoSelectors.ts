import { RootState } from "./store";

export const selectorSortByNameDown = (bookmarkId: number) => (state: RootState) => {
    const bookmark = state.todo.bookmarks.find(b => b.id === bookmarkId);
    if (!bookmark) return [];
    
    return [...bookmark.todos].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
};

export const selectorSortByNameUp = (bookmarkId: number) => (state: RootState) => {
    const bookmark = state.todo.bookmarks.find(b => b.id === bookmarkId);
    if (!bookmark) return [];

    return [...bookmark.todos].sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })
    );
};