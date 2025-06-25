import { useState } from 'react';
import '../../index.css'
import LogInModal from '../auth/login';
import AuthUser from '../auth/AuthUser';

const Menu = () =>{
    const [modalOpen, setModalOpen] = useState<null | 'login' | 'register'>(null)

    return (
        <header className='h-[72px] px-[80px] py-[20px] bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex justify-between'>
            <div>
                WhishList
            </div>
            <div className='flex gap-2'>
                <button 
                    className='h-[35px] w-[60px] mb-[50px] bg-white/10 backdrop-blur-lg text-white border border-white/30 rounded-lg shadow-md hover:bg-white/20 transition duration-300'
                    onClick={() => setModalOpen('login')}
                >
                    Log in
                </button>
                <button 
                    className='h-[35px] w-[80px] mb-[50px] bg-white/10 backdrop-blur-lg text-white border border-white/30 rounded-lg shadow-md hover:bg-white/20 transition duration-300'
                    onClick={() => setModalOpen('register')}
                >
                    Register
                </button>
            </div>
        <LogInModal isOpen={modalOpen === 'login'} onClose={()=> setModalOpen(null)} onSwitchToRegister={()=> setModalOpen('register')}/>
        <AuthUser isOpen={modalOpen === 'register'} onClose={()=> setModalOpen(null)} onSwitchToRegister={()=> setModalOpen('login')}/>
        </header>
    )
}

export default Menu