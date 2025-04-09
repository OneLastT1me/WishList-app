import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addTodo, removeTodo } from "../../appStore/todoSlice"


interface Todo {
    id: number
    text: string
  }
  
  interface Props {
    bookmarkId: number
    todoList?: Todo[]
  }

    const TodoList: React.FC<Props> = ({bookmarkId, todoList })=> {
    const [labelInformation, setLabelInformation ] = useState('')
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (labelInformation) {
            dispatch(addTodo({bookmarkId: bookmarkId, text: labelInformation}))
            setLabelInformation('')
        }
      }

    return (
        <div className="h-[calc(100vh-150px)] max-h-[700px] bg-white/5 border border-gray-700 px-6 py-4 rounded-lg shadow-md overflow-y-auto">
            <form onSubmit={handleSubmit} className="flex gap-3 mt-6">
                <input
                    className="flex-1 bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={labelInformation}
                    onChange={e => setLabelInformation(e.target.value)}
                    placeholder="Добавить задачу"
                />
                <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition" type="submit">
                    Добавить
                </button>
            </form>
            <ul className="mt-6 space-y-2">
                {todoList!! && todoList.map(item =>(
                    <li key={item.id} className={`flex justify-between p-2 border rounded 'bg-white'}`}>
                            {item.text}
                        <button
                             onClick={() => dispatch(removeTodo({bookmarkId: bookmarkId, todoId: item.id}))}
                            className="text-red-500 hover:underline"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList