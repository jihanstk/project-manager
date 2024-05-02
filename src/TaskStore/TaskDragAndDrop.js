import { create } from 'zustand'

export const useTasksDrag = create((set) => ({
  tasksDrag:{
    taskIndex:null,
  } ,
  setActiveTaskIndex: (taskIndex) => set((state) => ({
    tasksDrag: {
      taskIndex: taskIndex,
    }
  })),
  

}))