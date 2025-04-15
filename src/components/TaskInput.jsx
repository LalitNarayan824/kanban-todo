import React, { useState } from "react";
import { useKbStore } from "../store/kanbanStore";

const TaskInput = () => {
  const addTask = useKbStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        desc,
        status: 'todo' // 👈 this line is important!
      }
      
      addTask(newTask);
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div
      className="bg-gray-100 flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-4
    rounded-lg shadow-md"
    >
      <div className="w-full">
        <input
          type="text"
          className="input input-info my-2 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="input input-info my-2 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button
        className="btn btn-error mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={handleSubmit}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
