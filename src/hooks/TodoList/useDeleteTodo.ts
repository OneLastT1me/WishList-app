import { supabase } from "../../helper"

const useDeleteTodo = () =>{
    const getDeleteTodo = async (bookmarkId: number, todoId: number) =>{
        const { data } = await supabase.auth.getUser()
        const bookmarks = data.user?.user_metadata.bookmarks || []
        const targetBookmarkIndex = bookmarks.findIndex((item: {id : number}) => item.id === bookmarkId)

        if(targetBookmarkIndex !== -1){
            const updatedTodos = bookmarks[targetBookmarkIndex].todos.filter((item: {id: number}) => item.id !== todoId)

            const updatedBookmarks = [...bookmarks]
            updatedBookmarks[targetBookmarkIndex] = {
              ...bookmarks[targetBookmarkIndex],
              todos: updatedTodos
            }

              const {error} = await supabase.auth.updateUser({data: {bookmarks: updatedBookmarks}})

              if(error) console.error('error remove todo:' , error)
        }

    }
    return {getDeleteTodo}
}

export default useDeleteTodo