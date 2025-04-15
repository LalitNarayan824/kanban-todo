import React from "react";
import { useKbStore } from "../store/kanbanStore";
import TaskCard from "./TaskCard";
import { shallow } from "zustand/shallow";

const Columns = ({ status }) => {
  const tasks = useKbStore((state) => state.tasks || [], shallow);
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="flex flex-col gap-6 justify-start items-center h-full max-h-full overflow-y-auto p-6 rounded-lg shadow-lg border border-gray-500 bg-gray-700 w-full">
      <h2 className="text-white text-xl font-semibold mb-6 uppercase tracking-wide text-center">
        {status}
      </h2>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Columns;
