import React from "react";
import { SidebarSiswa } from "@/components/SidebarSiswa";
import { FooterComponent } from "@/components/Footer";

export default function Siswa ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <div id="section__content">
              <div className="flex pt-16 lg:pt-12 md:pt-12 sm:pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 h-screen">
                <SidebarSiswa/>
                <div className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
                  <main>
                    <div className="px-4 pt-8">
                      {children}
                    </div>
                  </main>
                  <FooterComponent/>
                </div>
              </div>
            </div>
        </>
    )
}