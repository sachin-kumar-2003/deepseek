import React from 'react'
import pencilIcon from '../assets/pencil_icon.svg'
import deleteIcon from '../assets/delete_icon.svg'
import threeDots from '../assets/three_dots.svg'

const ChatLabel = ({openMenu,setOpenMenu}) => {
  return (
    <div className='flex items-center justify-between p-2 text-white/80 hover:white/10 rounded-lg text-sm group cursor-pointer'>
      <p className='group-hover:max-w-5/6 truncate'>Chat Name Here</p>
      <div className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg'>
        <img src={threeDots} alt="" className={`w-4 ${openMenu.open ? '': 'hidden'} group-hover:block`}/>
        <div className={`absolute ${openMenu.open ? '': 'hidden'} -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}>
          <div className='flex items-center gap-3 hover:bg-white/10 px-2 py-2 rounded-lg'>
            <img src={pencilIcon} alt="" className='w-4'/>
            <p>Rename</p>
          </div>
          <div className='flex items-center gap-3 hover:bg-white/10 px-2 py-2 rounded-lg'>
            <img src={deleteIcon} alt="" className='w-4'/>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLabel