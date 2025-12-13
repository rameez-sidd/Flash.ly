import { IoMdArrowForward } from 'react-icons/io'
import { TbCardsFilled } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Flashcard = ({ card }) => {

    return (
        <div className='bg-white rounded-md xs:w-[400px] min-h-[200px] relative xs:mx-auto sm:w-full shadow-sm p-5'>
            <div className='flex items-center gap-4'>

                {/* Cover Image */}
                <div>
                    <img src={card.coverImg} className='min-w-12 max-w-12 min-h-12 max-h-12 rounded-full border bg-zinc-200 border-zinc-300' />
                </div>

                
                <div className='flex flex-col text-sm gap-0.5'>
                    {/* Group Name */}
                    <h4 className='font-semibold line-clamp-2'>{card.name}</h4>

                    {/* Number of Cards in the Group */}
                    <p className='text-zinc-500 text-xs flex items-center gap-2 border w-fit border-zinc-300 rounded-sm px-2 py-0.5'>
                        <span><TbCardsFilled /></span>
                        <span>{card.terms.length} Cards</span>
                    
                    </p>
                </div>
            </div>

            {/* Group Description */}
            <div className='mt-5 text-xs text-zinc-400 line-clamp-2'>
                {card.description}
            </div>

            {/* View Link */}
            <Link to={`/my-flashcards/${card.id}`} className='flex items-center gap-2 font-semibold text-blue-800 cursor-pointer hover:bg-blue-100/70 hover:px-2 transition-all duration-200 ease-out w-fit py-1 rounded-md text-sm absolute bottom-5 left-5'>
                <span className='text-xs'>View Card</span>
                <span><IoMdArrowForward /></span>
            </Link>
        </div>
    )
}

export default Flashcard