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

        renameMark(state, action:PayloadAction<{bookmarkId: number, text: string}>){
            const {bookmarkId , text } = action.payload
            const targetBookmark = state.bookmarks.find(item =>  item.id === bookmarkId)
            if(targetBookmark) targetBookmark.label = text
        },

        addBookMark(state, action:PayloadAction<string>){
            const newBookmark: Bookmark = {
                id: Date.now(),
                label: action.payload,
                todos: []
            }
            state.bookmarks.push(newBookmark)
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
        }
        
    }
})

export const {addBookMark, removeBookMark, addTodo , removeTodo, renameMark} = todoSlice.actions
export default todoSlice.reducer