import React from 'react'
import CategorySideBar from './_components/CategorySideBar'

function Layout({children}) {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-8'>
            <div className='hidden md:block'>
                <CategorySideBar/>
                {/* /side category nav bar */}
            </div>

            <div className='md:col-span-3 '>
            {children}
            </div>

        </div>
    </div>
  )
}

export default Layout