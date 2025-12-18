import { Outlet, Route, Routes } from 'react-router-dom'
import Menu from './components/header'
import Bookmarks from './components/wishlists/bookmarks'
import AuthProtectedRoute from './components/authProtectedRoute'
import { useEffect } from "react";
import { supabase } from './helper';
import { setUser, logout } from './appStore/authSlice';
import { useAppDispatch } from './hooks';
import Main from './components/main/main';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session?.user) {
        dispatch(setUser(data.session.user)); 
      } else {
        dispatch(logout());
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(logout());
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  const Layout = () => (
    <>
        <Menu/>
        <Main />
        <Outlet />
    </>
)

return (
    <Routes>
        <Route path='/' element={<Layout />} >
            <Route path='/home' element={<div>Home</div>} />
            <Route path='/WishList' element={
                <AuthProtectedRoute>
                    <Bookmarks />
                </AuthProtectedRoute>
            } />
        </Route >
    </Routes>
)
}

export default App
