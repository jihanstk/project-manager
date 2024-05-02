import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";


export default function Home() {
 
  return (
    <main className=" min-h-screen w-full  items-center justify-center bg-blue-200/10  ">
      <div className="relative">
        <div >
          <Image className="w-full h-screen blur-lg opacity-80" width={500} height={500} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlBbsEEC51HT58hUjjOR6dwiXoPt7DaDFMw&usqp=CAU" alt="bg"/>
        </div>
   <div className="absolute top-0 w-full bg-black/20 h-full flex justify-center items-center">

  <LoginForm/>

   </div>
      </div>
    </main>
  );
}
