"use client";

import { Button, Drawer, Sidebar } from "flowbite-react";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineCollection } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook, FaBookOpen, FaTasks } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import { FaUsers } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";
import { setIsShow, toggleIsShow } from "@/lib/redux/features/showSideBar/showSideBarSlice";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SidebarAdmin() {
  const isShow = useSelector((state: RootState) => state.showSideBar.isShow);
  const dispatch = useAppDispatch();
  const pathname = usePathname()
  
  useEffect(() => {
    dispatch(setIsShow(false));
  }, [pathname]);
  return (
    <>
    <Drawer open={isShow} onClose={() => dispatch(toggleIsShow())}>
      <Drawer.Header title="MENU" titleIcon={() => <></>} />
      <Drawer.Items>
        <aside id="default-sidebar">
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/admin" as={Link} icon={RiDashboardFill}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Collapse icon={FaUsers} label="User">
                  <Sidebar.Item href="/admin/guru" icon={GiTeacher} as={Link}>Guru</Sidebar.Item>
                  <Sidebar.Item href="/admin/siswa" icon={PiStudentBold} as={Link}>Siswa</Sidebar.Item>
                </Sidebar.Collapse>
                {/* <Sidebar.Item href="/admin/kelas" as={Link} icon={SiGoogleclassroom}>
                  Kelas
                </Sidebar.Item> */}
                <Sidebar.Item href="/admin/pelajaran" as={Link} icon={FaBook}>
                  Pelajaran
                </Sidebar.Item>
                {/* <Sidebar.Item href="/admin/materi" as={Link} icon={FaBookOpen}>
                  Materi
                </Sidebar.Item> */}
                {/* <Sidebar.Item href="/admin/tugas" as={Link} icon={FaTasks}>
                  Tugas
                </Sidebar.Item>
                <Sidebar.Item href="/admin/pengumpulan" as={Link} icon={HiOutlineCollection}>
                  Pengumpulan
                </Sidebar.Item> */}
                <Sidebar.Item icon={RiLogoutBoxLine}>
                  <LogoutButton />
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          </aside>
      </Drawer.Items>
    </Drawer>
    </>
  );
}
