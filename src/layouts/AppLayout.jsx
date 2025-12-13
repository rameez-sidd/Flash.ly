import Header from '../shared/components/Header'
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/components/Navbar'

const AppLayout = () => {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr] bg-gray-50 text-gray-900'>

        {/* header */}
        <Header/>

        {/* main content */}
        <main className='mx-auto w-7xl max-w-[95vw] py-6'>
            <Navbar/>
            <Outlet/>
        </main>

    </div>
  )
}

export default AppLayout