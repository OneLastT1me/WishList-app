import { useState } from "react";
import ModalWrapper from "../modals/modalWrapper"
import { setUser } from "../../appStore/authSlice";  
import { useAppDispatch } from "../../hooks";
import { supabase } from "../../helper";

interface modalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void
  }

const RegisterModal = ({isOpen, onClose, onSwitchToRegister}: modalProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {    
            setError(error.message)
            return
        }

        if (data.user) {
            dispatch(setUser(data.user))
            onClose()
        } else {
            setError('Registration failed. Please try again.')
        }
    
        setEmail('')
        setPassword('') 
    }

    if(!isOpen) return null

    return (
        <ModalWrapper
            title='Registration'
            textButton="Registration"
            onClose={onClose}
            onAltClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent) }
        >
            <form onSubmit={handleSubmit} className="p-6 mb-3 bg-white rounded-lg shadow-md">
                {error && (
                    <div className="mb-4 text-red-600">
                        {error}
                    </div>
                )}
                <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                    />
                <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                    />
                    <h3
                        onClick={onSwitchToRegister}
                        className="mt-10 text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition duration-200"
                    >
                        Do you have account? Log in
                    </h3>
            </form>
        </ModalWrapper>
 )   
}
export default RegisterModal
