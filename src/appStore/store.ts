import { configureStore } from "@reduxjs/toolkit"
import todoReducer from './todoSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer
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
    },
    auth: {
      user: null,
      isAuthenticated: false
    }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch