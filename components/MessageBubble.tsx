type Message = {
  role: 'user' | 'bot';
  content: string;
};

type MessageBubbleProps = {
  msg: Message;
  theme: 'light' | 'dark';
};

export default function MessageBubble({ msg, theme }: MessageBubbleProps) {
  const userMsg =
    theme === 'light'
      ? 'bg-blue-100 text-blue-900 border-blue-200 self-end ml-auto text-right'
      : 'bg-blue-900 text-blue-100 border-blue-700 self-end ml-auto text-right';
  const botMsg =
    theme === 'light'
      ? 'bg-gray-200 text-gray-900 border-gray-300 self-start'
      : 'bg-gray-800 text-gray-100 border-gray-700 self-start';

  return (
    <div
      className={`max-w-fit px-4 py-2 rounded-lg border ${
        msg.role === 'user' ? userMsg : botMsg
      } font-sans`}
      style={{
        fontFamily: 'inherit',
        fontSize: '1rem',
      }}
    >
      <p className="whitespace-pre-wrap">{msg.content}</p>
    </div>
  );
}
