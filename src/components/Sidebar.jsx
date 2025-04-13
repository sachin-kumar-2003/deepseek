import React from 'react'
import logoText from '../assets/logo_text.svg'
import logoIcon from '../assets/logo_icon.svg'
import menuIcon from '../assets/menu_icon.svg'
import closeIcon from '../assets/sidebar_close_icon.svg'
import chatIcon from '../assets/chat_icon.svg'
import chatIconDull from '../assets/chat_icon_dull.svg'
import sideBarIcon from '../assets/sidebar_icon.svg'
import phoneIcon from '../assets/phone_icon.svg'
import phoneIconDull from '../assets/phone_icon_dull.svg'
import qrcode from '../assets/qrcode.png'
import newIcon from '../assets/new_icon.svg'
import profileIcond from '../assets/profile_icon.svg'
import { useClerk,UserButton } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import ChatLabel from './ChatLabel'
function Sidebar({expend,setExpend}) {
  const {openSignIn} = useClerk()
  const {user}=useAppContext();
  const [openMenu,setOpenMenu]=useState({id:0,open:false})

  return (
    <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expend ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}>
      <div>
        <div className={`flex ${
            expend ? "flex-row gap-6" : "flex-col items-center gap-8"
          }`} onClick={() => setExpend(!expend)}>
          <img src={expend?logoText:logoIcon} alt="" />

          <div onClick={()=>expend ? setExpend(false):setExpend(true)} className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'>
            <img src={menuIcon} alt="" className='md:hidden'/>
            <img src={expend?closeIcon:sideBarIcon} alt="" className='md:block w-7'/>
            <div className={`absolute w-max ${expend ? "left-1/2 -translate-x-1/2 top-12":"-top-12 left-0 "} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
              {expend ? 'Close sidebar' : 'Open sidebar'}
                <div className={`w-3 h-3 absolute bg-black rotate-45 ${expend ? "left-1/2 -top-1.5 -translate-x-1/2":"left-4 -bottom-1.5"}`}></div>
            </div>
            </div>
          </div>
        


        <button className={`mt-8 flex items-center justify-center cursor-pointer ${expend ? "bg-blue-500 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max":"group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
          <img src={expend?chatIcon:chatIconDull} alt="" className={expend?'w-6':'w-7'} />
          <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shaow-lg pointer-events-none">
            New chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expend && <p className="text-white text font-medium">New chat</p>}
        </button>

        <div className={`mt-8 text-white/25 text-sm ${expend ? 'block':'hidden'}`}>
          <p className='my-1'>Recent</p>

          {/* chat label */}
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
      </div>
      
      <div>
        <div className={`flex items-center curson-pointer group relative ${expend ? "gap-1 text-white/80 text-sm p-2.5 border-primary rounded-lg hover:bg-white/10 cursor-pointer":"h-10 w-10 mx-auto hover:gray-500/30 rounded-lg"}`}>
          <img src={expend?phoneIcon:phoneIconDull} alt="" className={expend?"w-5":"w-6.5 mx-auto"} />
          <div className={`absolute -top-60 pb-8 ${!expend && "-right-40"} opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}>
          <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
            <img src={qrcode} alt="" className='w-44'/>
            <p>Scan to get DeepSeek App</p>
            <div className={`w-3 h-3 absolute bg-black rotate-45 ${expend ? "right-1/2":"left-4"} -bottom-1.5`}></div>
          </div>
          </div>
          {expend && <><span>Get App</span> <img src={newIcon} alt="" /></>}
        </div>
          <div onClick={user? null:openSignIn} className={`flex items-center ${expend ? "hover:bg-white/10 rounded-lg":"justify-center w-full"} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}>
            {user ? <UserButton />:<img src={profileIcond} alt="" className='w-7'/>}
            {expend && <span>My Profile</span>}
          </div>


      </div>

    </div>
  )
}

export default Sidebar