import { useEffect, useState } from "react";

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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
    
            {error && <p className="text-red-500 mb-4">{error}</p>}
    
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  
                />
              </div>
    
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Пароль
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  
                />
              </div>
    
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 text-gray-600 hover:underline"
                  onClick={onClose}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default LoginModal