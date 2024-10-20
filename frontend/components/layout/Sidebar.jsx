import { useAtom, useSetAtom } from 'jotai';
import React from 'react'
import { useNavigate } from 'react-router-dom'
// Icons
import { FaHome } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { GrTransaction } from "react-icons/gr";
// Global States
import { 
    searchTextState, 
    sidebarIndexState } from '@/store/store';

const sidebarArray = [ 
    { name :'Home', link:'/', icon:FaHome },
    { name :'Members', link:'/members', icon:IoPeopleSharp },
    { name :'Books', link:'/books', icon:ImBooks },
    { name :'Transactions', link:'/transactions', icon:GrTransaction },
]
function Sidebar() {
    const [currentIndex, setCurrentIndex] = useAtom(sidebarIndexState);

    const setSearchText = useSetAtom(searchTextState);

    const navigate = useNavigate();

    const navigator = ({content,index}) => {
        setCurrentIndex(index);
        navigate(content.link);
        setSearchText('');
    }
  return (
    <>
        <nav className='h-[95vh] w-1/12 text-center shadow-xl border-r-2 rounded-lg 
            flex flex-col items-center justify-start'>
            {sidebarArray.map((content,index) => (
                <button className={`${currentIndex === index ? `bg-green-300` : `bg-none`} 
                    w-11/12 h-auto py-2 px-1 my-2 rounded-lg cursor-pointer inline-flex items-center justify-start`}
                key={index}
                onClick={() => navigator({content, index})}
                >
                    <content.icon className={`${currentIndex === index ? `fill-green-500 stroke-green-500` : ``} size-7`}/>
                    &nbsp;
                    {content.name}
                </button>
            ))}
        </nav>
    </>
  )
}

export default Sidebar