import { configureStore } from "@reduxjs/toolkit"
import todoReducer from './todoSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer
  },
  preloadedState: {
    todo: {
      bookmarks: [
        {
          id: 1,
          label: 'First',
          todos: []
        },

      ]
    }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch