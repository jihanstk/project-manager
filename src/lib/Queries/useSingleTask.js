// "use client"
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useSingleTask = (id) => {
//     const { isPending, refetch, error, data } = useQuery({
//         queryKey: ["repoData"],
//         queryFn: () =>
//           axios
//             .get(`https://6630ec7fc92f351c03db97ac.mockapi.io/tasks/${id}`)
//             .then((res) => {
//               return res;
//             })
//             .catch((err) => console.log(err.message)),
//       });
    
//       return [data?.data, refetch];
// };

// export default useSingleTask;