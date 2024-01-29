import React from "react";

const Input = ({ message, setMessage, textRef }) => {
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-xl pl-4"
        placeholder="type a message..."
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  );
};

export default Input;
