import { FaUserAlt } from "react-icons/fa";


const Header = () => {

    return (
        <div className={`flex items-center justify-between p-3 px-3 xs:px-6 lg:px-8 xl:px-16 transition-all duration-200 ease-in-out sticky top-0 z-50 bg-navy-blue`}>
            {/* Logo */}
            <div>
                <img src="/images/logo.png" alt="Flash.ly" className="h-[30px]" />
            </div>

            {/* User Icon */}
            <span className="text-white hover:bg-white/20 w-8 h-8 grid place-items-center rounded-full cursor-pointer">
                <FaUserAlt />
            </span>

        </div>
    )
}

export default Header