"use client";

import { HiOutlineCollection } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook, FaBookOpen, FaTasks } from "react-icons/fa";
import Link from "next/link";
import { Sidebar } from "flowbite-react";

export function SidebarSiswa() {
    return (
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/kelas" as={Link}icon={SiGoogleclassroom}>
              Kelas
            </Sidebar.Item>
            <Sidebar.Item href="/pelajaran" as={Link}icon={FaBook}>
              Pelajaran
            </Sidebar.Item>
            <Sidebar.Item href="/materi" as={Link}icon={FaBookOpen}>
              Materi
            </Sidebar.Item>
            <Sidebar.Item href="tugas" as={Link}icon={FaTasks}>
              Tugas
            </Sidebar.Item>
            <Sidebar.Item href="/pengumpulan" as={Link}icon={HiOutlineCollection}>
              Pengumpulan
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
  }