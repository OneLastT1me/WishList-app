import { Bookmark } from "../../appStore/todoSlice"
import { supabase } from "../../helper"
import { toast } from "react-toastify";

const useAddBookmarks = () => {

    const addBookmark = async (bookmark: Bookmark) => {

        const { data, error } = await supabase.auth.getUser()
        
        if(error){
            console.error('error with get',error)
            return
        }

        if(bookmark){
            const currentBookmarks: Bookmark [] = Array.isArray(data.user?.user_metadata.bookmarks) ? data.user.user_metadata.bookmarks : []

            const updataBookmarks = [...currentBookmarks, bookmark]

            const {error} = await supabase.auth.updateUser({
                data: { bookmarks: updataBookmarks} 
            })
            if(error) toast.error('som')
        }
  

    }
  
    return { addBookmark }
  }

  export default useAddBookmarks