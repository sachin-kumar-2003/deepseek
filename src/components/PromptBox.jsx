import React, { useState } from 'react';
import deepthinkIcon from '../assets/deepthink_icon.svg';
import searchIcon from '../assets/search_icon.svg';
import pinIcon from '../assets/pin_icon.svg';
import arrowIcon from '../assets/arrow_icon.svg';
import arrowIconDull from '../assets/arrow_icon_dull.svg';
import { useAppContext } from '../context/AppContext';
import { GoogleGenAI } from "@google/genai";
import ChatMessages from './ChatMessages';
import { useUser } from '@clerk/clerk-react';
// const googleApiKey ='AIzaSyDdT1ICJDFN_tFd2NLDkAyxi8ivr-pN90E'; // Ensure you have the API key set in your environment variables
const googleApiKey=import.meta.env.VITE_GOOGLE_API_KEY; // Ensure you have the API key set in your environment variables
console.log(googleApiKey); // Log the API key for debugging purposes
const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setprompt] = useState('');
  const { user, chats, setChats, selectedChat, setSelectedChat } = useAppContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

    const promptCopy = prompt;
    setIsLoading(true);
    setprompt('');

    const userPrompt = {
      role: 'user',
      content: promptCopy,
      timestamp: Date.now(),
    };

    // Add user message to chat history
    setChats((prev) => [...prev, userPrompt]);
    setSelectedChat((prev) => [...prev, userPrompt]);
      main(prompt);
    }
  };

  // Initialize the GoogleGenAI API client
  const ai = new GoogleGenAI({ apiKey:googleApiKey });

  // Function to call Gemini API and handle the response
  const main = async (userPrompt) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userPrompt,
      });

      console.log('AI Response:', response);

      const aiMessage = {
        role: 'assistant',
        content: response.text, // Assuming response.text contains the AI's response
        timestamp: Date.now(),
      };

      // Update the chats and selectedChat with the AI's response
      setChats((prev) => [...prev, aiMessage]);
      setSelectedChat((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating content:', error);
      setIsLoading(false);
    }
  };

  // Function to send the prompt to Gemini API
  const sendPrompt = async (e) => {
    e.preventDefault();

    const promptCopy = prompt;
    setIsLoading(true);
    setprompt('');

    const userPrompt = {
      role: 'user',
      content: promptCopy,
      timestamp: Date.now(),
    };

    // Add user message to chat history
    setChats((prev) => [...prev, userPrompt]);
    setSelectedChat((prev) => [...prev, userPrompt]);

    // Call Gemini API with the prompt
    main(promptCopy);
  };

  return (
    <div className='w-11/12 flex flex-col items-center justify-center overflow-hidden'>
      {/* Chat messages display */}
      <ChatMessages chats={chats} /> {/* Use the ChatMessages component here */}

      {/* Input area */}
      <form onSubmit={sendPrompt}
        className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea
          onKeyDown={handleKeyDown}
          className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
          rows={2}
          placeholder='Message DeepSeek'
          required
          onChange={(e) => setprompt(e.target.value)}
          value={prompt}
        ></textarea>

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
            <button className={`${prompt ? "bg-blue-500" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
              <img className='w-3.5 aspect-square' src={prompt ? arrowIcon : arrowIconDull} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
