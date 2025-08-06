import { supabase } from "../../helper"

const useDeleteBookmark = () => {
    const deleteBookmark = async (bookmarkId: number) => {
        const { data } = await supabase.auth.getUser()

        const bookmarks = data.user?.user_metadata.bookmarks || []

        const updataBookmarks = bookmarks.filter((item: {id: number}) => item.id !== bookmarkId)

        const { error } = await supabase.auth.updateUser({data: {bookmarks: updataBookmarks}})

        if(error) return error || null
    }

    return {deleteBookmark}
}

export default useDeleteBookmark