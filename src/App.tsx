import { Outlet, Route, Routes } from 'react-router-dom'
import Menu from './components/header/menu'
import Bookmarks from './components/wishlists/bookmarks'

function App() {

  const Layout = () => (
    <>
        <Menu/>
        <Outlet />
    </>
)

return (
    <Routes>
        <Route path='/' element={<Layout />} >
            <Route path='/WishList' element={<Bookmarks />} />
        </Route >
    </Routes>
)
}

export default App
