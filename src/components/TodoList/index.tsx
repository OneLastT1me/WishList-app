import { useState } from "react"

const groups = [
    {
        name: 'TodoList'
    },
    {
        name: '1'
    },
]

const TodoLists = ()=>{
    const [activeGroupName, setActiveGroupId] = useState('')

    return (
        <div>
            <ul className='flex space-x-2'>
                {groups.map((group, index) => (
                    <li
                        key={index}
                        className={`px-4 py-2 rounded-xl cursor-pointer transition 
                        ${group.name === activeGroupName ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                    `}
                    onClick={() => setActiveGroupId(group.name)}
                    >
                        {group.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoLists