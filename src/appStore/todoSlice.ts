import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

export interface Bookmark {
    id: number
    label: string
    todos: Todo[]
  }

export interface Todo {
    id: number
    title: string
    text: string
}[]

interface BookMarksState {
    bookmarks: Bookmark[]
  }
  
const initialState: BookMarksState = {
    bookmarks: []
  }

const todoSlice  = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        setBookmarks(state, action: PayloadAction<Bookmark[]>) {
            state.bookmarks = action.payload;
        },

        renameMark(state, action:PayloadAction<{bookmarkId: number, text: string}>){
            const {bookmarkId , text } = action.payload
            const targetBookmark = state.bookmarks.find(item =>  item.id === bookmarkId)
            if(targetBookmark) targetBookmark.label = text
        },

        addBookMark(state, action: PayloadAction<Bookmark>) {
            state.bookmarks.push(action.payload)
        },

        removeBookMark(state, action: PayloadAction<number>){
            state.bookmarks = state.bookmarks.filter(item => item.id !==action.payload)
        },

        addTodo(state, action: PayloadAction<{bookmarkId: number, text: string, title: string}>){
            const { bookmarkId, text, title } = action.payload
            const newTodo: Todo ={
                id: Date.now(),
                title,
                text
            }
            
            const targetBookmark = state.bookmarks.find(item => item.id === bookmarkId)

            if (targetBookmark) {
                if (!targetBookmark.todos) targetBookmark.todos = []
                targetBookmark.todos.push(newTodo)
            }
        },
        
        removeTodo(state, action: PayloadAction<{bookmarkId: number, todoId: number}>){
            const { bookmarkId, todoId } = action.payload
            const targetBookmark = state.bookmarks.find(item => item.id === bookmarkId)
            if(targetBookmark && targetBookmark.todos) targetBookmark.todos = targetBookmark.todos.filter(todo => todo.id !== todoId)
        },

        updateTodosInBookmark(state, action: PayloadAction<{bookmarkId: number, todos: Todo[]}>) {
            const { bookmarkId, todos } = action.payload;
            const targetBookmark = state.bookmarks.find(b => b.id === bookmarkId);
            if (targetBookmark) {
                targetBookmark.todos = todos;
            }
        },
        
    }
})

export const {setBookmarks, addBookMark, removeBookMark, addTodo , removeTodo, renameMark, updateTodosInBookmark} = todoSlice.actions
export default todoSlice.reducer