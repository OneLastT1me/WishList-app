import { Outlet, Route, Routes } from 'react-router-dom'
import Menu from './components/header/menu'
import TodoLists from './components/TodoList'

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
            <Route path='/WishList' element={<TodoLists />} />
        </Route >
    </Routes>
)
}

export default App
