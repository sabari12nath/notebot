import React from 'react';

type ThemeToggleProps = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  className?: string;
  size?: 'sm' | 'md';
};

export default function ThemeToggle({ theme, setTheme, className = '', size = 'md' }: ThemeToggleProps) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`rounded border transition ${size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'} ${className}`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
