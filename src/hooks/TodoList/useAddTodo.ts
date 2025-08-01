import { supabase } from "../../helper"



const useAddTodo = () =>{
    const getAddTodo = async (bookmarkId: number, title: string, text?: string) =>{
    
        const { data } = await supabase.auth.getUser()
        const bookmarks = data.user?.user_metadata.bookmarks || []
        
        const targetBookmarkIndex = bookmarks.findIndex((item: {id : number}) => item.id === bookmarkId)

        if(targetBookmarkIndex !== -1){
            const newTodo = {
                id: Date.now(),
                title,
                text: text || ""
            }
            
            const updatedTodos = bookmarks[targetBookmarkIndex].todos ? [...bookmarks[targetBookmarkIndex].todos, newTodo] : [newTodo]

            const updatedBookmarks = [...bookmarks]
            updatedBookmarks[targetBookmarkIndex] = {
              ...bookmarks[targetBookmarkIndex],
              todos: updatedTodos
            }

              const {error} = await supabase.auth.updateUser({data: {bookmarks: updatedBookmarks}})

              if(error) console.error('error add todo :' , error)
        } 
        
       
    }  
return {getAddTodo}

}

export default useAddTodo