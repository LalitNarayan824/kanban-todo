import "./App.css";
import Columns from "./components/Columns";
import TaskInput from "./components/TaskInput";
import { useKbStore } from "./store/kanbanStore";

function App() {
  document.title = "KanBan-Todo";
  const { toast, fetchTasks, undo, redo } = useKbStore();

  return (
    <>
      <div className="main flex flex-col w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-gray-100 font-sans">
        <header className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 bg-opacity-30 bg-black backdrop-blur-md shadow-xl rounded-b-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide text-center md:text-left drop-shadow-md">
            🎯 KanBan Style Todo
          </h1>
          <div className="flex gap-3 md:gap-5 mt-5 md:mt-0">
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={undo}
            >
              ⬅️ Undo
            </button>
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={redo}
            >
              ➡️ Redo
            </button>
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={fetchTasks}
            >
              🔄 Fetch Mock Tasks
            </button>
          </div>
        </header>

        <main className="flex flex-col items-center px-4 md:px-10 py-10">
          <TaskInput />

          {toast && (
            <div className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-800 to-purple-700 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-sm animate-bounce transition-all">
              {toast}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between gap-8 mt-10 w-full max-w-7xl">
            {/* TODO Column */}
            <div className="glass-card flex-1">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-900">
                📋 To Do
              </h2>
              <Columns status="todo" />
            </div>

            {/* In Progress Column */}
            <div className="glass-card flex-1">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-900">
                ⚙️ In Progress
              </h2>
              <Columns status="in-progress" />
            </div>

            {/* Done Column */}
            <div className="glass-card flex-1">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-900">
                ✅ Done
              </h2>
              <Columns status="done" />
            </div>
          </div>
        </main>

        <footer className="flex justify-center items-center py-5 bg-opacity-30 bg-black text-white text-sm md:text-base backdrop-blur-md shadow-inner rounded-t-2xl">
          Made by <span className="ml-1 font-bold italic text-pink-300">Lalit</span> with 💖
        </footer>
      </div>
    </>
  );
}

export default App;
