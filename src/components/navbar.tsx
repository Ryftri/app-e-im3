"use client";

import Link from "next/link";
import { Button, Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import {toggleIsShow } from "@/lib/redux/features/showSideBar/showSideBarSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

export function NavbarComponent() {
    const pathname = usePathname()
    const dispatch = useAppDispatch();
    const isShow = useSelector((state: RootState) => state.showSideBar.isShow);
  return (    
    <Navbar fluid>
      {pathname === '/' ? <></> :
      <button 
      aria-controls="sidebar-multi-level-sidebar" 
      type="button" 
      onClick={() => dispatch(toggleIsShow())}
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        {isShow ? <IoMdClose size={25}/> : <GiHamburgerMenu size={25}/>}
      </button>
      }
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Aplikasi E-iM3</span>
      </Navbar.Brand>

      <div>
        <Button>Akun</Button>
      </div>
    </Navbar>
  );
}
