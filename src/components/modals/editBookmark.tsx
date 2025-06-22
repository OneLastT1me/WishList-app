import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeBookMark, renameMark } from "../../appStore/todoSlice";
import { Trash2 } from 'lucide-react';
import ModalWrapper from "./modalWrapper";

type Props = {
    bookmarkId: number
    isOpen: boolean;
    onClose: () => void;
  }

const EditBookmark = ({isOpen, onClose, bookmarkId}: Props) =>{
    const [modalOpen, SetModalOpen] =  useState(false)
    const [newNameMark, setNewNameMark] = useState('')
    const [error, setError] = useState(false)
    const bookmarkcount = useAppSelector(state => state.todo.bookmarks.length)
    const dispatch = useAppDispatch()

    const handleSubmit = () =>{
        if(newNameMark){
            dispatch(renameMark({bookmarkId: bookmarkId, text: newNameMark}))
            setNewNameMark('')
            onClose()
        }
    }

    if(!isOpen) return null

    return(
        <ModalWrapper
            title='edit bookmark'
            onAltClick={handleSubmit}
            onClose={() =>(onClose(), setError(false))}
            textButton='accept'    
        >
            <h3>Rename bookmark:</h3>
            <input
                className="border px-3 py-2 rounded"
                value={newNameMark}
                onChange={e => setNewNameMark(e.target.value)}
            />
            <div>
                <button onClick={bookmarkcount > 1 ? () => SetModalOpen(true): () => setError(true)} className="flex  items-center pt-8">
                <Trash2 />
                    <a href={'#'} className="text-blue ml-2">Delete Bookmark</a>
                </button>
                {
                    error && <span className="text-red-500 text-sm">You can`t delete last bookmark</span>
                }
            </div>
            <AcceptModal bookmarkId={bookmarkId} isOpen={modalOpen} onClose={() => (SetModalOpen(false), onClose())}/>
        </ModalWrapper>
  )
    
}


const AcceptModal = ({bookmarkId ,isOpen, onClose,}: Props) =>{
    const dispatch = useAppDispatch()

    if(!isOpen) return null

    return(
        <div
            className="fixed flex items-center justify-center bg-opacity-50 z-50"
            onChange={() => onClose()}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
            <button className="bg-blue-600 text-white px-4 py-2 rounded mx-4" type="submit" onClick={() => (dispatch(removeBookMark(bookmarkId)),  onClose())}>
                Delete
            </button>
            <button className="bg-White text-blue-600 px-4 py-2 rounded mx-4 " type="submit" onClick={() => onClose()}>
                Cancel
            </button>
            </div>
        </div>
    )
}

export default EditBookmark