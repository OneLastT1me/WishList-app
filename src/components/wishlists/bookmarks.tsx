import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import TodoList from "./todoList"
import { addBookMark } from "../../appStore/todoSlice"


type Props = {
    isOpen: boolean;
    onClose: () => void;
  }

const Bookmarks = () => {
    const bookmarks = useAppSelector(state => state.todo.bookmarks)
    const [activeGroup, setActiveGroup] = useState<number | null>(bookmarks[0].id)
    const [openModal, setOpenModal] = useState(false)

const   handleSubmit = (label: string, bookmarkId: number) =>{
    if(label === '+'){
        setOpenModal(true)
    }else{
        setActiveGroup(bookmarkId)
    }
}

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
                {bookmarks.map((group, index) => (
                    <li
                        key={index}
                        className={`px-4 py-1.5 rounded-t-md text-sm font-medium cursor-pointer transition-all duration-200
                        ${group.id === activeGroup ? 'bg-blue-600 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}
                    `}
                        onClick={() => handleSubmit(group.label, group.id)}
                    >
                    {group.label}
                    </li>
                    ))}
                    <li className={'px-3 py-1.5 rounded-t-md text-lg font-semibold cursor-pointer bg-gray-800 text-gray-400 hover:bg-gray-700'}
                        onClick={() => setOpenModal(true)}>
                    +
                    </li>
            </ul>
            <TodoList 
                todoList={bookmarks.find(i=> i.id === activeGroup)?.todos} 
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

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if (bookmark.trim()) {
            dispatch(addBookMark(bookmark))
            setBookmark('')
            onClose()
        }
    }

    if (!isOpen) return null;

    return(
          <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
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