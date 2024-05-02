
"use client"
import axios from "axios";
import { useEffect, useState } from "react";


const Page = ({params}) => {
    console.log(params);
   
    const[singleTask,setSingleTask]=useState({})
   useEffect(()=>{
    axios.get(`https://6630ec7fc92f351c03db97ac.mockapi.io/tasks/${params?.pId}`)
    .then((res) => {
        setSingleTask(res.data);
    })
    .catch((err) => console.log(err.message))
   },[params])
            console.log(singleTask);
    return (
        <section className="pr-3">
            <div className="bg-sky-700 h-52 w-full rounded-xl">
               
            </div>
            <h1 className="text-3xl font-bold "> {singleTask?.projectName}</h1>
        </section>
    );
};

export default Page;