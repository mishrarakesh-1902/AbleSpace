"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FolderClosed, User, ChevronDown, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-md">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } absolute md:relative z-40 w-64 h-full bg-gray-50/50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* User Profile */}
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800/50 mt-12 md:mt-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white overflow-hidden">
              <User size={18} />
            </div>
            <span className="font-semibold text-sm">Dexter</span>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 mb-2 flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
            <span>Workspace</span>
            <ChevronDown size={14} />
          </div>
          <nav className="space-y-1 px-2">
            <Link
              href="/tasks"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/tasks"
                  ? "bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <LayoutGrid size={18} />
              <span>Tasks</span>
            </Link>
            <Link
              href="/tasks/projects"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/tasks/projects"
                  ? "bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <FolderClosed size={18} />
              <span>Projects</span>
            </Link>
          </nav>
        </div>

        {/* Theme Toggle Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full text-left"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950">
        {/* Sub-header toggle for sidebar on desktop */}
        <div className="h-14 border-b border-gray-200 dark:border-zinc-800 flex items-center px-4 hidden md:flex">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-gray-500">
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
