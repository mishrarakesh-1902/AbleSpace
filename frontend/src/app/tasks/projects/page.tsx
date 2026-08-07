"use client";

import { FolderClosed } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
        <FolderClosed size={32} className="text-gray-400" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Projects</h1>
      <p className="max-w-md">
        This is a placeholder for the Projects page. You can build out this section based on future requirements.
      </p>
    </div>
  );
}
