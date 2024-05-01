"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link href={href}>
      <div className={`${href === pathname ? "bg-white text-black " : ""} duration-500 hover:bg-white hover:text-black p-3 font-bold`}>{children}</div>
    </Link>
  );
};

export default NavLink;
