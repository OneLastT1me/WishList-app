import {  useEffect, useRef, useState } from 'react';
import { logout } from '../../appStore/authSlice';
import { supabase } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AlignJustify, ArrowDownWideNarrow } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const DropProfileMenu = () => {
    const user = useAppSelector(state => state.auth.user);
    const [dropMenu, setDropMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
            console.error(error.message);
            return;
            }
            dispatch(logout());
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (!user) return null

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setDropMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])

    return (
            <>  
                <div className="relative" ref={menuRef}>
                <div className='flex items-center cursor-pointer gap-2'>
                    Welcome { dropMenu ? <ArrowDownWideNarrow onClick={() => setDropMenu(prev => !prev)}/> : <AlignJustify onClick={() => setDropMenu(prev => !prev)} />}
                </div>
                {dropMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                        Profile
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => (navigate('/WishList'), setDropMenu(prev => !prev))}
                    >
                        Your wishlist
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                        Settings
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                    </div>
                )}
                </div>
              </>
    )
}

export default DropProfileMenu;
