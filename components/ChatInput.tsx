type ChatInputProps = {
  input: string;
  setInput: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  theme: 'light' | 'dark';
};

export default function ChatInput({ input, setInput, handleSubmit, theme }: ChatInputProps) {
  const formClass =
    theme === 'light'
      ? 'bg-white border-t border-gray-200'
      : 'bg-gray-800 border-t border-gray-700';
  const inputClass =
    theme === 'light'
      ? 'bg-gray-100 text-gray-900 border border-gray-300'
      : 'bg-gray-800 text-gray-100 border border-gray-700';
  const buttonClass =
    theme === 'light'
      ? 'bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition'
      : 'bg-blue-700 text-white font-semibold px-4 py-2 rounded hover:bg-blue-800 transition';

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 flex items-center gap-2 shadow ${formClass}`}
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`flex-1 p-2 rounded font-sans outline-none focus:ring-2 focus:ring-blue-400 transition ${inputClass}`}
        style={{
          fontFamily: 'inherit',
          fontSize: '1rem',
        }}
      />
      <button type="submit" className={buttonClass}>
        Send
      </button>
    </form>
  );
}
