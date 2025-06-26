import ThemeToggle from './ThemeToggle';

type ChatHeaderProps = {
  name: string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

export default function ChatHeader({ name, theme, setTheme }: ChatHeaderProps) {
  const headerClass =
    theme === 'light'
      ? 'bg-white border-b border-gray-200 text-gray-900'
      : 'bg-gray-800 border-b border-gray-700 text-gray-100';

  return (
    <header className={`p-4 text-center font-bold text-2xl shadow flex items-center justify-center gap-4 ${headerClass}`}>
      <span>📝 NoteBot</span>
      <span className="ml-2 text-blue-600 font-normal dark:text-blue-300">— Ready for you, {name}</span>
      <ThemeToggle theme={theme} setTheme={setTheme} className="ml-4" />
    </header>
  );
}
