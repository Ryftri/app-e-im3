'use client'

import PelajaranDashboard from "@/components/PelajaranDashboard";
import { usePelajaranControllerFindAllQuery, usePelajaranControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Pelajaran } from "@/types/GetAllPelajaran";
import { Button, Modal, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSkeletonListPelajaran from "./loading";


export default function PelajaranPage() {
  const { data: getAllPelajaran, isLoading: isLoadingAllPelajaran, isError: isErrorAllPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindAllQuery();
  const router = useRouter();

  useEffect(() => {
    refetchPelajaran();
  }, [refetchPelajaran]);

  if (isLoadingAllPelajaran || isRefetchPelajaran) {
    return <LoadingSkeletonListPelajaran />;
  }

  if (isErrorAllPelajaran) {
    return <div>Error memuat data pelajaran</div>;
  }

  const pelajaranData = getAllPelajaran?.pelajaran || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">List Pelajaran</h1>
        <Button onClick={() => router.push('/admin/pelajaran/create')}>
          Tambah Pelajaran
        </Button>
      </div>

      {/* Dashboard Pelajaran */}
      <PelajaranDashboard
        data={{
          pelajaran: pelajaranData
        }}
        refetchPelajaran={refetchPelajaran}
        routeRole="admin"
      />
    </>
  );
}
