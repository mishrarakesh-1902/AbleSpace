"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Plus, MoreHorizontal, Calendar, SignalHigh, SignalMedium, SignalLow } from "lucide-react";
import { getTasks, createTask, updateTask, Task } from "@/lib/api";

const COLUMNS = ["To Do", "Doing", "Completed", "On Hold"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<"list" | "board">("board");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fields toggle state
  const [fields, setFields] = useState({
    Priority: true,
    Members: true,
    DueDate: true,
    Labels: true,
    Status: true,
    Reporter: false
  });

  const [showFieldsDropdown, setShowFieldsDropdown] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
    setLoading(false);
  };

  const handleAddTask = async (status: string = "To Do") => {
    const title = prompt("Enter task title:");
    if (!title) return;
    
    try {
      const newTask = await createTask({ title, status });
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 border border-gray-200 dark:border-zinc-800 rounded-md text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowFieldsDropdown(!showFieldsDropdown)}
              className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 dark:border-zinc-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <SlidersHorizontal size={16} />
              <span>Fields</span>
            </button>
            
            {showFieldsDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg rounded-xl z-50 p-2">
                <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1 mb-3">
                  <button 
                    onClick={() => setView("list")} 
                    className={`flex-1 text-sm font-medium py-1 rounded-md transition-colors ${view === "list" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                  >
                    List
                  </button>
                  <button 
                    onClick={() => setView("board")} 
                    className={`flex-1 text-sm font-medium py-1 rounded-md transition-colors ${view === "board" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                  >
                    Board
                  </button>
                </div>
                <div className="space-y-1 px-1">
                  {Object.entries(fields).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md cursor-pointer">
                      <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <input 
                        type="checkbox" 
                        checked={value}
                        onChange={() => setFields(f => ({ ...f, [key]: !f[key as keyof typeof fields] }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="p-1.5 border border-gray-200 dark:border-zinc-800 rounded-md text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
            <SlidersHorizontal size={16} />
          </button>
          
          <button 
            onClick={() => handleAddTask()}
            className="flex items-center space-x-1 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500">Loading tasks...</div>
        ) : view === "board" ? (
          <BoardView tasks={filteredTasks} onAddTask={handleAddTask} fields={fields} />
        ) : (
          <ListView tasks={filteredTasks} onAddTask={handleAddTask} fields={fields} />
        )}
      </div>
    </div>
  );
}

// Subcomponents

function BoardView({ tasks, onAddTask, fields }: { tasks: Task[], onAddTask: (status: string) => void, fields: any }) {
  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-4">
      {COLUMNS.map(column => (
        <div key={column} className="flex-shrink-0 w-80 bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 border-dashed rounded-xl flex flex-col">
          <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">{column}</span>
              <span className="text-xs bg-gray-200 dark:bg-zinc-800 px-2 rounded-full font-medium">
                {tasks.filter(t => t.status === column).length}
              </span>
            </div>
            <div className="flex space-x-1 text-gray-400">
              <button onClick={() => onAddTask(column)} className="p-1 hover:text-gray-700 dark:hover:text-gray-200"><Plus size={14} /></button>
              <button className="p-1 hover:text-gray-700 dark:hover:text-gray-200"><MoreHorizontal size={14} /></button>
            </div>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto space-y-3">
            {tasks.filter(t => t.status === column).map(task => (
              <TaskCard key={task.id} task={task} fields={fields} />
            ))}
            <button 
              onClick={() => onAddTask(column)}
              className="w-full py-2 flex items-center justify-center space-x-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListView({ tasks, onAddTask, fields }: { tasks: Task[], onAddTask: (status: string) => void, fields: any }) {
  return (
    <div className="space-y-6 pb-12">
      {COLUMNS.map(column => {
        const columnTasks = tasks.filter(t => t.status === column);
        
        return (
          <div key={column} className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
            <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-2">
                <ChevronDown size={16} />
                <span className="font-semibold text-sm">{column}</span>
                <span className="text-xs bg-gray-200 dark:bg-zinc-800 px-2 rounded-full font-medium">{columnTasks.length}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Task</th>
                    {fields.Priority && <th className="px-4 py-2.5 font-medium w-32">Priority</th>}
                    {fields.Members && <th className="px-4 py-2.5 font-medium w-32">Members</th>}
                    {fields.DueDate && <th className="px-4 py-2.5 font-medium w-32">Due Date</th>}
                    <th className="px-4 py-2.5 font-medium w-16">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                  {columnTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{task.title}</td>
                      {fields.Priority && (
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-1.5">
                            {task.priority === 'High' && <SignalHigh size={14} className="text-red-500" />}
                            {task.priority === 'Medium' && <SignalMedium size={14} className="text-orange-500" />}
                            {task.priority === 'Low' && <SignalLow size={14} className="text-gray-400" />}
                            <span className={task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-orange-500' : 'text-gray-500'}>
                              {task.priority || 'Medium'}
                            </span>
                          </div>
                        </td>
                      )}
                      {fields.Members && (
                        <td className="px-4 py-3">
                          <div className="flex -space-x-1">
                            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[10px] text-white">CN</div>
                          </div>
                        </td>
                      )}
                      {fields.DueDate && (
                        <td className="px-4 py-3 text-gray-500">
                          {task.dueDate || "12 Sep 2026"}
                        </td>
                      )}
                      <td className="px-4 py-3 text-gray-400"><MoreHorizontal size={16} /></td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="px-4 py-2">
                      <button 
                        onClick={() => onAddTask(column)}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors py-1"
                      >
                        <Plus size={14} />
                        <span>Add Task</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TaskCard({ task, fields }: { task: Task, fields: any }) {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium leading-snug">{task.title}</h3>
        <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0"><MoreHorizontal size={14} /></button>
      </div>
      
      <div className="flex items-center justify-between">
        {fields.Members && (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">AD</div>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        )}
        
        {fields.DueDate && (
          <div className="flex items-center space-x-1 text-xs text-red-500 font-medium bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">
            <Calendar size={12} />
            <span>29 Jul</span>
          </div>
        )}
      </div>

      {fields.Labels && (
        <div className="mt-3 flex flex-wrap gap-1">
          <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
            Deployment
          </span>
        </div>
      )}
    </div>
  );
}
