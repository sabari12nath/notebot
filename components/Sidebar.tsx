import React from 'react';
import { X, Book } from 'lucide-react';

type SidebarProps = {
  isDarkMode: boolean;
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  showQuickTopics: boolean;
  setShowQuickTopics: (v: boolean | ((prev: boolean) => boolean)) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void;
  messages: any[];
  setInputValue: (v: string) => void;
  downloadChat: () => void;
  clearHistory: () => void;
};

interface CollapseButtonProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
}) => (
  <button
    className={`absolute -right-4 top-6 z-30 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow p-1 transition-transform duration-200 ${
      sidebarCollapsed ? 'rotate-180' : ''
    }`}
    style={{ outline: 'none' }}
    onClick={() => setSidebarCollapsed((prev: boolean) => !prev)}
    title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
  >
    <span className="block w-5 h-5 text-gray-600 dark:text-gray-300">
      ▶
    </span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  showHistory,
  setShowHistory,
  showQuickTopics,
  setShowQuickTopics,
  sidebarCollapsed,
  setSidebarCollapsed,
  messages,
  setInputValue,
  downloadChat,
  clearHistory,
}) => (
  <div
    className={`transition-all duration-300 ${
      sidebarCollapsed ? 'w-16 min-w-[4rem]' : 'w-80 min-w-[20rem]'
    } fixed lg:relative lg:translate-x-0 z-20 h-full`}
  >
    <div
      className={`h-full backdrop-blur-xl border-r flex flex-col ${
        isDarkMode
          ? 'bg-gray-900/30 border-gray-700/50'
          : 'bg-white/30 border-gray-200/50'
      }`}
    >
      {/* Collapse/Expand Arrow */}
      <CollapseButton
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className={`p-6 ${sidebarCollapsed ? 'hidden' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-xl ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
              }`}
            >
              <Book className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2
                className={`font-bold text-lg ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                KTU Civil Bot
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Your Engineering Buddy
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-500/20"
          >
            <X
              className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            />
          </button>
        </div>
        <div className="space-y-4">
          {/* Quick Topics Collapsible */}
          <div
            className={`p-4 rounded-xl backdrop-blur-sm ${
              isDarkMode ? 'bg-gray-800/40' : 'bg-white/40'
            } border border-gray-500/20`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowQuickTopics((prev: boolean) => !prev)}
            >
              <h3
                className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Quick Topics
              </h3>
              <span
                className={`transition-transform duration-200 ${
                  showQuickTopics ? 'rotate-90' : 'rotate-0'
                }`}
              >
                ▶
              </span>
            </div>
            {showQuickTopics && (
              <div className="space-y-2">
                {[
                  'Concrete Technology',
                  'Structural Analysis',
                  'Surveying',
                  'Fluid Mechanics',
                ].map((topic, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700/50 text-gray-300'
                        : 'hover:bg-gray-200/50 text-gray-700'
                    }`}
                    onClick={() =>
                      setInputValue(`Tell me about ${topic}`)
                    }
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            className={`p-4 rounded-xl backdrop-blur-sm ${
              isDarkMode ? 'bg-gray-800/40' : 'bg-white/40'
            } border border-gray-500/20`}
          >
            <h3
              className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Statistics
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span
                  className={
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                >
                  Messages
                </span>
                <span
                  className={
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }
                >
                  {messages.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                >
                  Session
                </span>
                <span
                  className={
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }
                >
                  Active
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={clearHistory}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                isDarkMode
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
              }`}
            >
              Clear Chat History
            </button>
            <button
              onClick={downloadChat}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                isDarkMode
                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
              }`}
            >
              Export Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
