import React, { useEffect } from "react";
import { ChatHeader } from "../header";
import { ChatMessages } from "../messages";
import { ChatActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../../features/chatSlice.js";
import { checkOnlineStatus } from "../../../utils/chat.js";

const ChatContainer = ({ onlineUsers, typing }) => {
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* container */}
      <div>
        {/* chat header */}
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        {/* chat messages */}
        <ChatMessages typing={typing} />
        {/* chat actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
