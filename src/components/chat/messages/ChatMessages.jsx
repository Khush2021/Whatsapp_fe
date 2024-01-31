import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import Message from "./Message";
import { Typing, Message } from ".";

const ChatMessages = ({ typing }) => {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat
    "
    >
      {/*Container*/}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* messages */}
        {messages &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              me={user._id === message.sender._id}
            />
          ))}
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
