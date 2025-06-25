import { useEffect, useState } from "react";
import ModalWrapper from "../modals/modalWrapper";
import AuthUser from "./AuthUser";
interface modalProps {
    isOpen: boolean
    onClose: () => void;
    onSwitchToRegister: () => void
  }

const LogInModal = ({isOpen, onClose, onSwitchToRegister}: modalProps) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalAuthUser, setModalAuth] = useState<null | 'login' | 'register'>(null)
    const [error, setError] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      if (email === "user@example.com" && password === "password123") {
        console.log("Авторизация успешна!");
        setError("");
        onClose(); 
      } else {
        setError("Неверные учетные данные. Попробуйте снова.");
      }
    };

    useEffect(()=>{
        setEmail("");
        setPassword("");
        setError("");
    },[isOpen])

    if (!isOpen) return null;

    return (
      <ModalWrapper
        title='login'
        onClose={onClose}
        onAltClick={onClose}
        textButton='accept'
      >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {
              error && <p>error</p>
            }
            <h3
              onClick={onSwitchToRegister}
              className="mt-10 text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition duration-200"
            >
                Don’t have an account? Register
            </h3>
            </div>             
      </ModalWrapper>
      );
}

export default LogInModal