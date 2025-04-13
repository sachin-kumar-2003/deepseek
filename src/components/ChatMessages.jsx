import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useUser } from '@clerk/clerk-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Typewriter } from 'react-simple-typewriter';
import 'highlight.js/styles/github-dark.css';

import botIcon from '../assets/deepthink_icon.svg'; // replace with your actual bot icon path

const ChatMessages = () => {
  const { chats } = useAppContext();
  const { user } = useUser();

  if (!chats || chats.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 p-4 w-[60%] mx-auto overflow-y-auto">
      {chats.map((chat, index) => {
        const isUser = chat.role === 'user';

        return (
          <div
            key={index}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
          >
            <div className="flex items-start gap-2 max-w-[85%]">
              {!isUser && (
                <img
                  src={botIcon}
                  alt="Bot"
                  className="w-8 h-8 rounded-full mt-1"
                />
              )}
              {isUser && (
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="w-8 h-8 rounded-full mt-1"
                />
              )}

              <div
                className={`prose prose-sm px-5 py-3 rounded-2xl shadow-md break-words 
                ${isUser ? 'bg-blue-600 text-white prose-invert' : 'bg-[#2e2e32] text-white prose-invert'}`}
              >
                {chat.typing ? (
                  <Typewriter
                    words={[chat.content]}
                    cursor
                    cursorStyle="_"
                    typeSpeed={30}
                    deleteSpeed={0}
                    delaySpeed={0}
                  />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {chat.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
