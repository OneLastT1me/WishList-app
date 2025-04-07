import { useState } from 'react';
import '../../index.css'
import LoginModal from '../auth/login';

const Menu = () =>{
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <header className='h-[72px] px-[80px] py-[20px] bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex justify-between'>
            <div>
                WhishList
            </div>
            <div>
                <button 
                    className='h-[35px] w-[60px] mb-[50px] bg-white/10 backdrop-blur-lg text-white border border-white/30 rounded-lg shadow-md hover:bg-white/20 transition duration-300'
                    onClick={() => setModalOpen(true)}
                >
                    Log in
                </button>
            </div>
        <LoginModal isOpen={modalOpen} onClose={()=> setModalOpen(false)}/>
        </header>
    )
}

export default Menu