import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import TodoList from "./todoList"
import { addBookMark } from "../../appStore/todoSlice"

const Bookmarks = () => {
    const bookmarks = useAppSelector(state => state.todo.bookmarks)
    const [activeGroup, setActiveGroup] = useState<number>(bookmarks[0].id)
    const [openModal, setOpenModal] = useState(false)

const   handleSubmit = (label: string, bookmarkId: number) =>{
    if(label === '+'){
        setOpenModal(true)
    }else{
        setActiveGroup(bookmarkId)
    }
}

    return(
        <div className="mt-[15px] mx-[40px]">
            <ul className="flex space-x-0.5">
                {bookmarks.map((group, index) => (
                    <li
                    key={index}
                    className={`px-[8px]  max-w-[100px] max-h-[35px] py-2 rounded-t-lg cursor-pointer transition whitespace-nowrap
                        ${group.id === activeGroup ? 'bg-blue-600 text-white shadow-md px-[20px]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                    `}
                    onClick={() => handleSubmit(group.label, group.id)}
                    >
                    {group.label}
                    </li>
                    ))}
                    <li className={'px-[8px]  w-[34px] max-h-[35px] py-2 rounded-t-lg cursor-pointer transition whitespace-nowrap bg-gray-800 text-gray-400 hover:bg-gray-700'}
                    onClick={() => setOpenModal(true)}>
                    +
                    </li>
            </ul>
            <TodoList 
                todoList={bookmarks.find(i=> i.id === activeGroup)?.todos} 
                bookmarkId={activeGroup}
            />
            <ModalAddLabel isOpen={openModal} onClose={()=> setOpenModal(false)}/>
        </div>
    )
}

export default Bookmarks

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const ModalAddLabel  = ({isOpen, onClose}: LoginModalProps) => {
    const [bookmark, setBookmark] = useState('')
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if (bookmark.trim()) {
            dispatch(addBookMark(bookmark))
            setBookmark('')
        }
    }

    if (!isOpen) return null;

    return(
          <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={handleSubmit}
          >
            <form  className="flex">
            <input
              className="border px-3 py-2 rounded"
              value={bookmark}
              onChange={e => setBookmark(e.target.value)}
              placeholder="Добавить задачу"
            />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit"     onClick={onClose}>
                Добавить
                </button>
            </form>
          </div>
        </div>

    )
}