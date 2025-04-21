import { useState } from "react";
import { addTodo } from "../../appStore/todoSlice";
import { useAppDispatch } from "../../hooks";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title && title) {
            dispatch(addTodo({bookmarkId: bookmarkId, text: text, title: title}))
            setTitle('')
            setText('')
            onClose()
        }
      }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3>Title:</h3>
            <input
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="add new name/task"
            />
             <h3>Discription:</h3>
             <textarea
                className="w-full min-h-[100px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="double information about this todo"
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                disabled={false}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => (onClose(), setTitle(''))}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancele
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddTodoModal