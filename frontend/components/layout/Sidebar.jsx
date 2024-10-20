import { useAtom } from 'jotai';
import React from 'react'
import { useNavigate } from 'react-router-dom'
// Global States
import { sidebarIndexState } from '@/store/store';

const sidebarArray = [ 
    { name :'Home', link:'/' },
    { name :'Members', link:'/members' },
    { name :'Books', link:'/books' },
]
function Sidebar() {
    const [currentIndex, setCurrentIndex] = useAtom(sidebarIndexState);

    const navigate = useNavigate();

    const navigator = ({content,index}) => {
        setCurrentIndex(index);
        navigate(content.link)
    }
  return (
    <>
        <nav className='h-[95vh] w-1/12 text-center shadow-xl border-r-2 rounded-lg 
            flex flex-col items-center justify-start'>
            {sidebarArray.map((content,index) => (
                <button className={`${currentIndex === index ? `bg-green-300` : `bg-none`} w-11/12 h-auto py-2 my-2 rounded-lg cursor-pointer`}
                key={index}
                onClick={() => navigator({content, index})}
                >
                    {content.name}
                </button>
            ))}
        </nav>
    </>
  )
}

export default Sidebar