import React from "react";
import { SidebarSiswa } from "@/components/SidebarSiswa";

export default function Siswa ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <div className="h-full w-full flex flex-col items-center justify-center">
                <SidebarSiswa/>
                {children}
            </div>
        </>
    )
}