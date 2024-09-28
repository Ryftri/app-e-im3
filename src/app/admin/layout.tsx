"use client"

import { FooterComponent } from "@/components/Footer";
import { SidebarAdmin } from "@/components/SidebarAdmin";
import React from "react";

export default function Admin ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div id="section__content" className="sm:ml-64">
        <div className="flex pt-16 lg:pt-12 md:pt-12 sm:pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 h-screen">
          <SidebarAdmin />
          <div className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <main>
              <div className="px-4 pt-6">
                {children}
              </div>
            </main>
            <FooterComponent/>
          </div>
        </div>
      </div>
    )
}