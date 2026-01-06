import { useEffect, useState } from "react";
import ModalWrapper from "../modals/modalWrapper";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../appStore/authSlice";
import { useAppDispatch } from "../../hooks";
import { supabase } from "../../helper";

interface modalProps {
    isOpen: boolean
    onClose: () => void;
    onSwitchToRegister: () => void
  }

const LogInModal = ({isOpen, onClose, onSwitchToRegister}: modalProps) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
  
    const handleSubmit = async  (email: string, password: string, e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        setError(error.message);
        return;
      }
      if (data.user) {
        dispatch(setUser(data.session.user));
        navigate('/WishList');
        onClose();
        console.log("Login successful", data.user);
      } else {
        setError("Login failed. Please try again.");
      }
      setEmail("");
      setPassword("");
    }

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
        onAltClick={() => handleSubmit(email, password, new Event('submit') as unknown as React.FormEvent)}
        textButton='accept'
      >
          <form onSubmit={(e) => handleSubmit(email, password, e)} className="p-6 mb-3 bg-white rounded-lg shadow-md">
            {error && (
              <div className="mb-4 text-red-600">
                {error}
              </div>
            )}
          <div className="mb-4">
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
              Don’t have an account? Register
            </h3>
            </div>
          </form>             
      </ModalWrapper>
      );
}

export default LogInModal