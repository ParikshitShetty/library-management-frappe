import React from 'react'
import Sidebar from './Sidebar'

function SidebarContainer({ children }) {
  return (
    <>
        <div className='min-h-screen w-full flex flex-start items-center'>
          <Sidebar />
          {children}
        </div>
    </>
  )
}

export default SidebarContainer