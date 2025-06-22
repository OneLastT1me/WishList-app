
type Props = {
    title: string
    children: React.ReactNode
    textButton: string
    onClose: () => void
    onAltClick: () => void 
}

const ModalWrapper: React.FC<Props> = ({title, children, onClose, textButton, onAltClick}) =>{

    return (
    <div 
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
                {children}
            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onAltClick}
                >
                    {textButton}
                </button>
                <button
                    type="button"
                    onClick={(onClose)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                    Cancele
                </button>
            </div>    
        </div>
    </div>
    )
    
}

export default ModalWrapper