import { Outlet, Route, Routes } from 'react-router-dom'
import Menu from './components/header'
import Bookmarks from './components/wishlists/bookmarks'
import AuthProtectedRoute from './components/authProtectedRoute'
import { useEffect } from "react";
import { supabase } from './helper';
import { setUser, logout } from './appStore/authSlice';
import { useAppDispatch } from './hooks';
import { ToastContainer } from "react-toastify";

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
        <Outlet />
    </>
)

return (
  <>
    <ToastContainer 
      position="top-center"
      closeOnClick
      autoClose={5000}
      hideProgressBar
      newestOnTop
      pauseOnHover
      draggable
      toastClassName={(context) => {
        const base = "rounded-lg shadow-md px-4 py-3 text-sm transition-all duration-300 w-[300px] inline-flex";
        const common = "text-white ";
    
        const type = context?.type;
    
        switch (type) {
          case "success":
            return `${base} ${common} bg-green-600`;
          case "error":
            return `${base} ${common} bg-red-600`;
          case "info":
            return `${base} text-black border-yellow-600`;
          default:
            return `${base} ${common} bg-gray-700`;
        }
      }}
    />
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
  </>
)
}

export default App
