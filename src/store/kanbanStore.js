import { create } from "zustand";
import {persist} from 'zustand/middleware'
const initialState = {
  tasks: [],
  history: [],
  future: [],
  toast: "",
};
export const useKbStore = create(
  persist((set, get) => ({
    ...initialState
    ,
    addTask: (task) => {
      const { tasks } = get();
      const newTasks = [...tasks, task];

      set((state) => ({
        tasks: newTasks,
        history: [...state.history, state.tasks],
        future: [],
      }));

      get().showToast("Task added ✅");
    },
    deleteTask: (id) => {
      const filtered = get().tasks.filter((task) => task.id !== id);

      set((state) => ({
        tasks: filtered,
        history: [...state.history, state.tasks],
        future: [],
      }));

      get().showToast("Task deleted ❌");
    },
    moveTask: (id, newStatus) =>
      set(() => {
        const newTasks = get().tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        );

        return {
          tasks: newTasks,
        };
      }),
    undo: () => {
      const { history, tasks, future } = get();
      if (history.length === 0) return;

      const prev = history[history.length - 1];
      const updatedHistory = history.slice(0, -1);
      set({
        tasks: prev,
        history: updatedHistory,
        future: [tasks, ...future],
      });

      get().showToast("Undo ⬅️");
    },

    redo:()=>{
      const {future , tasks, history } = get()

      if(future.length===0) return 

      const next = future[0]

      set({
        tasks:next,
        history:[...history , tasks],
        future : future.slice(1),
      })


      get().showToast('Redo ➡️')

    },

    fetchTasks: async () => {
      const mockData = [
        { id: 101, title: "Mock Task 1", desc: "From mock", status: "todo" },
        { id: 102, title: "Mock Task 2", desc: "In progress", status: "in-progress" },
        { id: 103, title: "Mock Task 3", desc: "Completed", status: "done" },
      ];
    
      set((state) => ({
        tasks: [...state.tasks , ...mockData],
        history: [...state.history, state.tasks],
        future: [],
      }));
    
      get().showToast("Mock tasks loaded!");
    },
    showToast:(msg)=>{
      set({toast:msg})

      setTimeout(()=>set({toast:''}),2000)
    },
  }),
  {
    name:'kanban-store'
  }
)
);
