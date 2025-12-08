import { IoMdCreate } from 'react-icons/io'
import { TbCardsFilled } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const NavigationLink = ({ path, icon, label }) => {
    return (
        <NavLink to={path} className={({ isActive }) => `${isActive ? "border-dark-blue text-dark-blue" : "hover:text-blue-800/65 text-zinc-400 border-transparent "} flex items-center gap-1 h-full px-4 border-b-4 cursor-pointer transition-all duration-200 ease-out -mb-1`}>
            <span>{icon}</span>
            <p className='text-sm font-semibold'>{label}</p>
        </NavLink>
    )
}

const Navbar = () => {
    return (
        <div className='flex items-center h-12 border-b-2 border-zinc-200 mb-6'>
            <NavigationLink path="/" icon={<IoMdCreate />} label="Create New"/>
            <NavigationLink path="/my-flashcards" icon={<TbCardsFilled />} label="My Flashcards"/>
            
        </div>
    )
}

export default Navbar