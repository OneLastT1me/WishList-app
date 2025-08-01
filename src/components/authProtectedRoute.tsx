import { useAppSelector } from '../hooks';
import RegisterModal from './auth/register';
import LogInModal from './auth/login';
import React, { useState } from 'react';

type AuthProtectedRouteProps = {
    children: React.ReactNode;
} 

const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps): React.ReactElement => {
    const [modalOpen, setModalOpen] = useState<null | 'login' | 'register'>('login')
    const user = useAppSelector(state => state.auth.user);

    if (!user) {
        return (
            <>
            <LogInModal
                isOpen={modalOpen === 'login'}
                onClose={() => setModalOpen(null)}
                onSwitchToRegister={() => setModalOpen('register')}
            />
               <RegisterModal
                isOpen={modalOpen === 'register'}
                onClose={() => setModalOpen(null)}
                onSwitchToRegister={() => setModalOpen('login')}
            />
            </>
        );
    }
    return <>{children}</>;
}

export default AuthProtectedRoute;
