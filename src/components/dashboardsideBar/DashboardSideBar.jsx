"use client";

import Image from "next/image";
import NavLink from "../common/NavLink/NavLink";

const DashboardSideBar = ({ children }) => {

    const dashLinks=[
        {   _id:1,
            title:"Profile",
            path:"/dashboard"

        } ,{   _id:2,
            title:"Your All Project",
            path:"/projects"

        }, 
    ]
  
  return (
   <main className="relative w-full">
    {/* sideBar */}
    <section className="fixed left-0 min-h-[100vh] w-[300px] bg-sky-900">
        {/* site Logo and name */}
        <div className="flex gap-4 items-center px-3 py-4">
            <Image width={300} height={300} className="w-10 h-10" src="/project-logo.png" alt="Logo"/>
            <h1 className="text-white font-bold">Project Manager</h1>
        </div>
        <hr />
        <ul className="text-white pt-3">

            {
                dashLinks.map(link=> <NavLink key={link._id} href={link.path}>
                <li> {link.title}</li>
                </NavLink>)
            }
           
           
        </ul>
    </section>
    {/* content  */}
    <section className={`absolute right-0 min-h-screen w-[calc(100%-310px)] `}>
        <div className="w-full bg-red-300 py-9 px-4 border-b shadow-sm">
slkdfna;sl
        </div>
        {children}
    </section>
   </main>
  );
};

export default DashboardSideBar;
