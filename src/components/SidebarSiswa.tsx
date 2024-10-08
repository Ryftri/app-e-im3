"use client";

import { HiOutlineCollection } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import { FaBook, FaBookOpen, FaTasks } from "react-icons/fa";
import Link from "next/link";
import { Drawer, Sidebar } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setIsShow, toggleIsShow } from "@/lib/redux/features/showSideBar/showSideBarSlice";
import LogoutButton from "./LogoutButton";

export function SidebarSiswa() {
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
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {/* <Sidebar.Item href="/kelas" as={Link}icon={SiGoogleclassroom}>
                  Kelas
                </Sidebar.Item> */}
                <Sidebar.Item href="/siswa/asal-sekolah-dan-jenjang" as={Link}icon={FaBook}>
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
      </Drawer.Items>
      </Drawer>
    );
  }