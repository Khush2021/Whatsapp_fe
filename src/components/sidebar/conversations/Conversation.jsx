import React from "react";
import { dateHandler } from "../../../utils/date.js";
import { useDispatch, useSelector } from "react-redux";
import { create_open_conversation } from "../../../features/chatSlice.js";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat.js";

const Conversation = ({ convo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const { token } = user;
  const values = {
    receiver_id: getConversationId(user, convo.users),
    token,
  };
  const openConversation = () => {
    dispatch(create_open_conversation(values));
  };
  return (
    <li
      onClick={() => openConversation()}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
      }`}
    >
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture  */}
          <div className="relative h-[50px] min-w-[50px] rounded-full overflow-hidden">
            <img
              src={getConversationPicture(user, convo.users)}
              alt={getConversationName(user, convo.users)}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation name and message */}
          <div className="flex w-full flex-col">
            {/* conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {getConversationName(user, convo.users)}
            </h1>
            {/* conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage?.message.substring(0, 25)}...`
                      : convo.latestMessage?.message}
                  </p>
                  {/* convo.latestMessage.message- this might get error as some conversations might not have latest message */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs ">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Conversation;
