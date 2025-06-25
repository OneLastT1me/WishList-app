import ModalWrapper from "../modals/modalWrapper"

interface modalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void
  }

const AuthUser = ({isOpen, onClose, onSwitchToRegister}: modalProps) => {

    if(!isOpen) return null

    return (
        <ModalWrapper
            title='Registration'
            textButton="Registration"
            onClose={onClose}
            onAltClick={onClose}
        >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                <h3
                    onClick={onSwitchToRegister}
                    className="mt-10 text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition duration-200"
                >
                    Do you have account? Log in
                </h3>
            </div>
        </ModalWrapper>
 )   
}
export default AuthUser
