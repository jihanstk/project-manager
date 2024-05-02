import { create } from "zustand";

export const useTasksStore = create((set) => ({
  tasksState: {
    taskIndex:null,
    tasks:[]
  },
  addTask: (task) => set((state) => ({ tasks: task })),

  editTasks: (taskID, updateTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === taskID ? task : updateTask
      ),
    })),
  removeTasks: (taskID) =>
    set((state) => ({ tasks: state.tasks.map((task) => task !== taskID) })),
    setActiveTaskIndex: (taskIndex) => set((state) => ({
      tasksState: {
        taskIndex: taskIndex,
      }
    })),
}));
