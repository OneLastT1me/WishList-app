import { supabase } from "../../helper"

const useRenameBoomark = () => {
    const renameBookmark  = async (bookmarkId: number, newBookmarkName: string) =>{
        const { data } =  await supabase.auth.getUser()
        const bookmarks = data.user?.user_metadata.bookmarks || []
        const targetBookmarkIndex = bookmarks.findIndex((item: {id : number}) => item.id === bookmarkId)

        if(targetBookmarkIndex !== -1) bookmarks[targetBookmarkIndex].label = newBookmarkName

        const { error } = await supabase.auth.updateUser({data: {bookmarks}})

        if(error) console.error('updata rename: ' , error)        
    }

    return {renameBookmark}
}

export default useRenameBoomark