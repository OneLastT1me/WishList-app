import { useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks"
import { removeTodo } from "../../appStore/todoSlice"
import { Cog } from "lucide-react";
import EditBookmark from "../modals/editBookmark";
import AddTodoModal from "../modals/addTodo";
import useDeleteTodo from "../../hooks/TodoList/useDeleteTodo";

interface Todo {
    id: number
    title: string
    text: string
  }
  
  interface Props {
    bookmarkId: number
    todoList?: Todo[]
  }

    const TodoList: React.FC<Props> = ({bookmarkId, todoList })=> {
    const [modalEditMark, setModalEditMark] = useState(false)
    const [modalAddTodo, setModalAddTodo] = useState(false)
    const [opentodo, setOpenModal] = useState<number | null>(null)
    const [sortAsc, setSortAsc] = useState<boolean>()
    const [dataTodo, setDataTodo] = useState<Todo[]>(todoList!)
    const dispatch = useAppDispatch()
    const {getDeleteTodo} = useDeleteTodo()

    const SortList = (sortAsc: boolean) => {
        if(sortAsc) {
            setSortAsc(false)
            const sortedList = [...todoList!].sort((a, b) => a.title.localeCompare(b.title));
            setDataTodo(sortedList);
            return sortedList;
        } else {
            setSortAsc(true)
            const sortedList = [...todoList!].sort((a, b) => b.title.localeCompare(a.title));
            setDataTodo(sortedList);
            return sortedList;
        }
    }
    
    useEffect(() =>{
        setDataTodo(todoList!)
    },[todoList])
 
    return (
        <div className='h-[calc(100vh-150px)] max-h-[700px] bg-white/5 border border-gray-700 px-6 py-4 rounded-lg shadow-md overflow-y-auto'>
            <div className='flex justify-between'>
                    <button onClick={() => setModalAddTodo(true)} className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition" type="submit'>
                        Add
                    </button>
                    <button onClick={() =>setModalEditMark(true)}>
                        <Cog />
                    </button>
            </div>
            <ul className="mt-6 space-y-2">
                <button
                    onClick={() => SortList(sortAsc!!)}
                    className='mb-4 bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600'
                >
                    Сортировать по {sortAsc ? 'убыванию' : 'возрастанию'}
                </button>
                {dataTodo!! && dataTodo.map(item =>(
                    <li key={item.id} className='flex justify-between p-2 border border-indigo-500/100 rounded'>
                        <div onClick={() => setOpenModal(item.id)} className={`overflow-hidden flex-initial w-full cursor-pointer translate-all duration-500 ease-in-out  ${(item.id === opentodo && item.text!!) ? 'h-full' : 'h-[30px]'} `}>
                            <h2 className='font-semibold pb-[8px]'>{item.title}<br/></h2>
                            <p className='whitespace-pre-wrap text-gray-700'>{item.text}</p>
                        </div>
                        <button
                            onClick={() => (
                                dispatch(removeTodo({bookmarkId: bookmarkId, todoId: item.id}),
                                getDeleteTodo(bookmarkId, item.id)
                                ))}
                            className='text-red-500 hover:underline h-[20px]'
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
            <EditBookmark bookmarkId={bookmarkId} isOpen={modalEditMark} onClose={() => setModalEditMark(false)} />
            <AddTodoModal bookmarkId={bookmarkId} isOpen={modalAddTodo} onClose={() => setModalAddTodo(false)} />
        </div>
    )
}

export default TodoList