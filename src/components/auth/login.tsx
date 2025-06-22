import { useEffect, useState } from "react";
import ModalWrapper from "../modals/modalWrapper";
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const LoginModal: React.FC<LoginModalProps>= ({isOpen, onClose}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
        <form onSubmit={handleSubmit}>
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
              Пароль
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </form>
      </ModalWrapper>
      );
}

export default LoginModal