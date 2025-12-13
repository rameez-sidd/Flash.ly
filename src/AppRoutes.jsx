import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import CreateCard from './features/create-card/CreateCard'
import MyFlashcards from './features/my-flashcards/MyFlashcards'
import FlashCardDetails from './features/my-flashcards/FlashCardDetails'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout/>}>
                    <Route index element={<CreateCard/>} />
                    <Route path='my-flashcards' element={<MyFlashcards/>}/>
                    <Route path='my-flashcards/:cardId' element={<FlashCardDetails/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes