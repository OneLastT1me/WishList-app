import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import TodoList from "./todoList"
import { addBookMark, setBookmarks } from "../../appStore/todoSlice"
import useAddBookmark from "../../hooks/Bookmark/useAddBookmark"
import { supabase } from "../../helper"


type Props = {
    isOpen: boolean;
    onClose: () => void;
  }

const Bookmarks = () => {
    const bookmarks = useAppSelector(state => state.todo.bookmarks)
    const [activeGroup, setActiveGroup] = useState<number | null>(bookmarks.length > 0 ? bookmarks[0].id : null)
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useAppDispatch();

    const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : [];


const   handleSubmit = (label: string, bookmarkId: number) =>{
    if(label === '+'){
        setOpenModal(true)
    }else{
        setActiveGroup(bookmarkId)
    }
}

//load data on redux
useEffect(() => {
    const loadBookmarks = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("error load bookmarks:", error.message);
        return;
      }
      const fetchedBookmarks = data.user.user_metadata.bookmarks
                || []
            dispatch(setBookmarks(fetchedBookmarks))

        }
        loadBookmarks()
  }, [dispatch]);

//cheacking relevance of active Group
useEffect(() => {
    if (activeGroup !== null) {
      const stillExists = bookmarks.some(b => b.id === activeGroup)
      if (!stillExists) {
        setActiveGroup(bookmarks.length > 0 ? bookmarks[0].id : null)
      }
    }
  }, [bookmarks, activeGroup])

    return(
        <div className="mt-[15px] mx-[40px]">
            <ul className="flex gap-1 border-gray-700 pb-2">
                {safeBookmarks.map((item, index) => (
                    <li
                        key={index}
                        className={`px-4 py-1.5 rounded-t-md text-sm font-medium cursor-pointer transition-all duration-200 
                        ${item.id === activeGroup ? 'bg-blue-600 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}
                    `}
                        onClick={() => handleSubmit(item.label, item.id)}
                    >
                        <div className="max-w-[100px] truncate">
                            {item.label}
                        </div>
                    </li>
                    ))}
                    <li 
                        className={'px-3 py-1.5 rounded-t-md text-lg font-semibold cursor-pointer bg-gray-800 text-gray-400 hover:bg-gray-700'}
                        onClick={() => setOpenModal(true)}
                    >
                        +
                    </li>
            </ul>
            <TodoList 
                todoList={safeBookmarks.find(i=> i.id === activeGroup)?.todos} 
                bookmarkId={activeGroup!}
            />
            <ModalEditLabel isOpen={openModal} onClose={()=> setOpenModal(false)}/>
        </div>
    )
}

export default Bookmarks

const ModalEditLabel  = ({isOpen, onClose}: Props) => {
    const [bookmark, setBookmark] = useState('')
    const dispatch = useAppDispatch()
    const { addBookmark } = useAddBookmark()

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        if (bookmark.trim()) {
            const newBookmark = {
                id: Date.now(),
                label: bookmark,
                todos: []
            }
            dispatch(addBookMark(newBookmark))
            await addBookmark(newBookmark)
            setBookmark('')
            onClose()
        }
    }

    if (!isOpen) return null;

    return(
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
            <form  className="flex">
                <input
                    className="border px-3 py-2 rounded"
                    value={bookmark}
                    onChange={e => setBookmark(e.target.value)}
                    placeholder="add new bookmark"
                    />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" onClick={handleSubmit}>
                    Add
                </button>
            </form>
          </div>
        </div>
    )
}