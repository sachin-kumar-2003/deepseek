import { useState } from 'react'
import Image from './assets/menu_icon.svg'
import Image2 from './assets/chat_icon.svg'
import logoIcon from './assets/logo_icon.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import PromptBox from './components/PromptBox'
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import Message from './components/Message'

function App() {
  const [expend,setExpend] = useState(false)
  const [messages,setMessages] = useState([])
  const [isLoading,setIsLoading] = useState(false)
return <>
<div>
  <div className='flex h-screen '>
    <Sidebar expend={expend} setExpend={setExpend} />
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
        <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
        <img src={Image} alt="menu" className='rotate-180' onClick={() => setExpend(!expend)} />  
        <img  src={Image2} className='opacity-70' alt="chat" />
      </div>

      {messages.length === 0 ? (
        <>
        <div className='flex items-center gap-3'>
          <img src={logoIcon} alt="vite" className='h-16'/>
          <p className="text-2xl font-medium">Hi, I'm DeepSeek</p>
        </div>
        <p className="text-sm mt-2">How can I help you today?</p>
        </>
      ):(<div>
        <Message role='user' content='what is next js ?'/>
      </div>)}

      <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
      <p className="text-xs absolute bottom-1 text-gray-500">
        AI-generated, for reference only
      </p>
      </div>

  </div>
</div>
</>

}
export default App