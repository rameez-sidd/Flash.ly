import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import CreateCard from './features/create-card/CreateCard'
import MyFlashcards from './features/my-flashcards/MyFlashcards'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout/>}>
                    <Route index element={<CreateCard/>} />
                    <Route path='my-flashcards' element={<MyFlashcards/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes