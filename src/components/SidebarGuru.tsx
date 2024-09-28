"use client";

import { Drawer, Sidebar } from "flowbite-react";
import { HiOutlineCollection } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook, FaBookOpen, FaTasks } from "react-icons/fa";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import LogoutButton from "./LogoutButton";
import { setIsShow, toggleIsShow } from "@/lib/redux/features/showSideBar/showSideBarSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SidebarGuru() {
    const isShow = useSelector((state: RootState) => state.showSideBar.isShow);
    const pathname = usePathname()
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setIsShow(false));
    }, [pathname]);

    return (
      <Drawer open={isShow} onClose={() => dispatch(toggleIsShow())}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
        <aside id="default-sidebar">
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {/* <Sidebar.Item href="/kelas" as={Link}icon={SiGoogleclassroom}>
                  Kelas
                </Sidebar.Item> */}
                <Sidebar.Item href="/guru/pelajaran" as={Link} icon={FaBook}>
                  Pelajaran
                </Sidebar.Item>
                {/* <Sidebar.Item href="/materi" as={Link}icon={FaBookOpen}>
                  Materi
                </Sidebar.Item> */}
                {/* <Sidebar.Item href="tugas" as={Link}icon={FaTasks}>
                  Tugas
                </Sidebar.Item>
                <Sidebar.Item href="/pengumpulan" as={Link}icon={HiOutlineCollection}>
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
    );
  }
  