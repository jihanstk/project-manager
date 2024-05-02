"use client"
import { useTasksStore } from "@/TaskStore/Tasks";
import TaskDrower from "@/components/TaskCard/TaskDrower";
import TaskColumn from "@/components/TaskColumn/TaskColumn";
import useTasks from "@/lib/Queries/useTasks";
import axios from "axios";
const Taskrander = () => {
  const taskIndex = useTasksStore((state) => state.tasksState.taskIndex);
    const [tasks,refetch] = useTasks()
    console.log(tasks);

    const onDrop=(status,position,id)=>{
      if(taskIndex===undefined||taskIndex===null)return;
     const taskToMove = tasks[taskIndex]
      const updatedTask = tasks.filter((task,index)=>index!==taskIndex)
      updatedTask.splice(position,0,{
        ...taskToMove,
        status:status
      })
      console.log(updatedTask);
      axios.put(`https://6630ec7fc92f351c03db97ac.mockapi.io/tasks/${id}`,{status:status}).then(res=>{console.log(res)
      refetch()
    })
    }
  return (
    <div>
      <div className="border mt-2 py-3 px-4 rounded-md">
        {/* <button className="bg-gradient-to-r from-blue-500 via-sky-400 to-sky-600 px-4 py-2 rounded-lg  flex items-center gap-1 text-white font-bold">
          <GoPlus className="w-5  h-5 font-bold" />
           */}
        <TaskDrower />
        {/* </button> */}
      </div>
      <div className="flex justify-between  gap-3 w-11/12 mx-auto">
        <TaskColumn onDrop={onDrop} tasks={tasks} status="To Do" />
        <TaskColumn onDrop={onDrop} tasks={tasks} status="In Progress" />
        <TaskColumn onDrop={onDrop} tasks={tasks} status="Done" />
      </div>
    </div>
  );
};

export default Taskrander;
