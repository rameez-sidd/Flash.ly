import React from 'react'
import { MdInfoOutline } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const MyFlashcards = () => {
    const cards = useSelector((state) => state.cards);

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
                    <div>
                        Hahahaha
                    </div>
                )
            }
        </div>
    )
}

export default MyFlashcards