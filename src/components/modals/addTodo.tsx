import { useState } from "react";
import { addTodo } from "../../appStore/todoSlice";
import { useAppDispatch } from "../../hooks";
import ModalWrapper from "./modalWrapper";

type Props = {
    bookmarkId: number
    isOpen: boolean;
    onClose: () => void;
  }

const AddTodoModal = ({bookmarkId, isOpen ,onClose}:Props) =>{
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [text, setText] =useState('')

    if (!isOpen) return null

    const handleSubmit = () => {
        if (title) {
            dispatch(addTodo({bookmarkId: bookmarkId, text: text, title: title}))
            setTitle('')
            setText('')
            onClose()
        }
      }

    return (
      <ModalWrapper
        title='Add Task'
        onClose={() => (onClose(), setTitle(''), setText(''))}
        textButton='accept'
        onAltClick={handleSubmit}       
      >
              <h3>Title:</h3>
              <input
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="add new name"
              />
              <h3>Discription:</h3>
              <textarea
                  className="w-full min-h-[100px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 text-sm"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="double information about this todo"
              />
      </ModalWrapper>
    )
}

export default AddTodoModal