"use client";
import { useTasksStore } from "@/TaskStore/Tasks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useTasks = () => {
  const setTasks = useTasksStore((state) => state.addTask);
  const { isPending, refetch, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://6630ec7fc92f351c03db97ac.mockapi.io/tasks")
        .then((res) => {
          setTasks(res.data);
          return res;
        })
        .catch((err) => console.log(err.message)),
  });

  return [data?.data, refetch];
};

export default useTasks;
