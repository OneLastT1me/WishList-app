import { useEffect, useRef, useState } from "react";
import { addTodo } from "../../appStore/todoSlice";
import { useAppDispatch } from "../../hooks";
import ModalWrapper from "./modalWrapper";
import useAddTodo from "../../hooks/TodoList/useAddTodo";
import { useParsLink } from "../../hooks/useParseLink";

type Props = {
    bookmarkId: number
    isOpen: boolean;
    onClose: () => void;
  }

const AddTodoModal = ({bookmarkId, isOpen ,onClose}:Props) =>{
    const dispatch = useAppDispatch()
    const [loadingPrevie, setLoadingPreview] = useState(false)
    const lastParsedLink = useRef<string | null>('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState('')
    const {getAddTodo} = useAddTodo()
    const {parseLink} = useParsLink()

    const resetForm = () => {
      setTitle('')
      setText('')
      setLink('')
      setImage('')
      lastParsedLink.current = null
    }

// https://kvshop.com.ua/smartfony/google/google-pixel-10-pro-xl-16-256gb-obsidian.html?utm_medium=cpc&utm_source=hotline&utm_campaign=%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D1%8B+%D0%B8+%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5+%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D1%8B&utm_term=Google+Pixel+10+Pro+XL+16%2F256GB+Obsidian&utm_id=hotline_11&utm_content=589905
    const handleSubmit = async () => {
        if (title) {
            const error  = await getAddTodo(bookmarkId, title, text)
            if(!error){
              dispatch(addTodo({bookmarkId: bookmarkId, text: text, title: title}))
            }
          resetForm()
        }
    }

    useEffect(()=>{
      if(!link.startsWith("http")) return
      if(lastParsedLink.current === link) return
      lastParsedLink.current = link
      let cancelled = false
      const timer = setTimeout(async ()=>{
        setLoadingPreview(true)

        try{
          const data = await parseLink(link)
          if(cancelled) return
          if(!text && data.description) setText(data.description)
          if(data.image) setImage(data.image)
            console.log(data.title)
        }catch{
          setLoadingPreview(false)
        }finally {
           if(!cancelled) setLoadingPreview(false)
        }
      }, 1000)

      return () => {
        cancelled = false,
        () => clearTimeout(timer)
      }
    },[link, parseLink])

    if (!isOpen) return null

    return (
      <ModalWrapper
          title='Add Task'
          onClose={() => (onClose(),resetForm())}
          textButton='accept'
          onAltClick={handleSubmit}       
      >
        <h3>Title:</h3>
        <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new name"
        />     
        <h3>Link:</h3>
        <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={link}
            onChange={(e)=> setLink(e.target.value)}
            placeholder="Add a link which you want to remember"
        />
        <h3>Discription:</h3>
        <textarea
            className="w-full min-h-[100px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Additional information about this todo"
            maxLength={200}
        />
        <img className="rounded-xl h-[75px] w-[75px] object-contain bg-gray-300 "  src={image || undefined} />
      </ModalWrapper>
    )
}

export default AddTodoModal