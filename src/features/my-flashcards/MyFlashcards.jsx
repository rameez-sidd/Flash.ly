import { MdInfoOutline } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Flashcard from './Flashcard';

const MyFlashcards = () => {
    const cards = useSelector((state) => state.cards);    

    // If cards not found returning an Error Message
    if (!cards) {
        return (
            <div className='grid place-items-center h-32'>
                <div className='flex items-center gap-1 text-red-400'>
                    <span><BiError /></span>
                    <p className='text-xs'>Something went wrong while fetching the cards. Please refresh the page</p>
                </div>
            </div>
        )
    }

    return (
        <div className=''>
            {
                cards.length === 0 ? (
                    <div className='grid place-items-center h-32'>
                        <div className='flex items-center gap-1 text-zinc-400'>
                            <span><MdInfoOutline /></span>
                            <p className='text-xs'>You haven't created any cards yet. <Link to="/" className='text-blue-700 font-semibold hover:underline'>Create New Card</Link></p>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-4 lg:gap-5 xl:gap-8'>
                        {
                            cards.map((card) => (
                                <Flashcard card={card} key={card.id}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MyFlashcards