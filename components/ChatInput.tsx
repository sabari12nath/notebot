import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

type ChatInputProps = {
  isDarkMode: boolean;
  inputValue: string;
  setInputValue: (v: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const ChatInput: React.FC<ChatInputProps> = ({
  isDarkMode,
  inputValue,
  setInputValue,
  handleKeyDown,
  sendMessage,
  textareaRef,
}) => (
  <div
    className={`border-t p-4 backdrop-blur-xl ${
      isDarkMode
        ? 'bg-gray-900/30 border-gray-700/50'
        : 'bg-white/30 border-gray-200/50'
    }`}
  >
    <div className="flex space-x-4">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about concrete, structures, or why your calculations are wrong... 😏"
          className={`w-full p-4 pr-12 rounded-2xl resize-none backdrop-blur-sm border focus:outline-none focus:ring-2 ${
            isDarkMode
              ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-blue-500/50'
              : 'bg-white/70 border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
          }`}
          rows={3}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim()}
          className={`absolute bottom-3 right-3 p-2 rounded-xl transition-all ${
            inputValue.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : isDarkMode
              ? 'bg-gray-700 text-gray-500'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p
      className={`text-xs mt-2 text-center ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      Press Shift + Enter for new line • Enter to send • Made with ❤ for KTU Civil Engineers
    </p>
  </div>
);

export default ChatInput;
