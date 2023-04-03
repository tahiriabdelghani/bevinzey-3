import React from "react";

function MessagesFooter({ sendMessage, setNewMessage, newMessage }) {
  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        {/* Message input */}
        <form
          className="grow flex"
          onSubmit={(e) => {
            e.preventDefault();
            newMessage !== "" && sendMessage(newMessage);
          }}
        >
          <div className="grow mr-3">
            <label htmlFor="message-input" className="sr-only">
              Type a message
            </label>
            <input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              id="message-input"
              className="form-input w-full bg-slate-100 text-black border-transparent focus:bg-white focus:border-slate-300"
              type="text"
              placeholder="Aa"
            />
          </div>
          <button
            type="submit"
            className="btn bg-orange-600 hover:bg-orange-500 text-white whitespace-nowrap"
          >
            Send -&gt;
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessagesFooter;
