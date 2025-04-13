import React, { useState } from 'react'
import deepthinkIcon from '../assets/deepthink_icon.svg'
import searchIcon from '../assets/search_icon.svg'
import pinIcon from '../assets/pin_icon.svg'
import arrowIcon from '../assets/arrow_icon.svg'
import arrowIconDull from '../assets/arrow_icon_dull.svg'

const PromptBox = ({setIsLoading,isLoading}) => {
  const [prompt,setprompt]=useState('');

  return (
    <form 
    className={`w-full ${false ? "max-w-3xl":"max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
    <textarea className='outline-none w-full resize-none overflow-hidden break-words bg-transparent' rows={2} placeholder='Message DeepSeek' required onChange={(e)=>setprompt(e.target.value)} value={prompt}></textarea>


    <div className="flex items-center justify-between text-sm">
      <div className='flex items-center gap-2'>
        <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
          <img src={deepthinkIcon} alt="" className='h-5' />
          DeepThink (R1)
        </p>

        <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
          <img src={searchIcon} alt="" className='h-5' />
          Search
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <img className='w-4 cursor-pointer' src={pinIcon} alt="" />
        <button className={`${prompt ? "bg-blue-500":"bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
          <img className='w-3.5 aspect-square' src={prompt?arrowIcon:arrowIconDull} alt="" />
        </button>

      </div>
    </div>

    </form>
  )
}

export default PromptBox