'use client'

import PelajaranDashboard from "@/components/PelajaranDashboard";
import { usePelajaranControllerFindAllQuery, usePelajaranControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Pelajaran } from "@/types/GetAllPelajaran";
import { Button, Modal, Pagination, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSkeletonListPelajaran from "./loading";
import { getCookie } from "cookies-next";


export default function PelajaranPage() {
  const { data: getAllPelajaran, isLoading: isLoadingAllPelajaran, isError: isErrorAllPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindAllQuery({
    authorization: `Bearer ${getCookie('refreshToken')}`
  });
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
  const totalPelajaran = pelajaranData.length;
  const totalPages = Math.ceil(totalPelajaran / itemsPerPage);

  const indexOfLastPelajaran = currentPage * itemsPerPage;
  const indexOfFirstPelajaran = indexOfLastPelajaran - itemsPerPage;
  const currentPelajaran = pelajaranData.slice(indexOfFirstPelajaran, indexOfLastPelajaran);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Pelajaran</h1>
        <Button onClick={() => router.push('/guru/pelajaran/create')}>
          Tambah Pelajaran
        </Button>
      </div>

      {/* Dashboard Pelajaran */}
      <PelajaranDashboard
        data={{
          pelajaran: currentPelajaran
        }}
        setCurrentPage={setCurrentPage}
        refetchPelajaran={refetchPelajaran}
        routeRole="guru"
      />

      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showIcons
          previousLabel="Kembali"
          nextLabel="Lanjutkan"
        />
      </div>
    </>
  );
}
