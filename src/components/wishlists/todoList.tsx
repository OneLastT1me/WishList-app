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
        <div className="h-svh max-h-[700px] border px-3 py-2 rounded">
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                <input
                    className="border px-3 py-2 rounded"
                    value={labelInformation}
                    onChange={e => setLabelInformation(e.target.value)}
                    placeholder="Добавить задачу"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
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