'use client'

import { usePelajaranControllerFindOneQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Button, Card, Modal, Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import LoadingSkeletonGetOnePelajaran from "./loading";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { useRouter } from "next/navigation";
import InfoCardMateri from "@/components/materi/InfoCardMateri";
import { getCookie } from "cookies-next";

export default function PelajaranPageById({ params }: { params: { id: string } }) {
  const { data: getPelajaran, isLoading: isLoadingPelajaran, isError: isErrorPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindOneQuery({
    id: Number(params.id),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  
  useEffect(() => {
    refetchPelajaran()
  }, [refetchPelajaran])

  function handleEditPelajaran(id: number) {
    router.push(`/admin/pelajaran/edit/${id}`);
    // alert(`Id Pelajaran ${id}`)
  }

  function handleEditMateri(id: number) {
    router.push(`/admin/materi/edit/${id}`);
    // alert(`Id Pelajaran ${id}`)
  }

  if(isLoadingPelajaran || isRefetchPelajaran) {
    return <LoadingSkeletonGetOnePelajaran/>
  }

  const materiData = getPelajaran?.pelajaran.materi || [];
  const totalMateri = materiData.length;
  const totalPages = Math.ceil(totalMateri / itemsPerPage);

  const indexOfLastMateri = currentPage * itemsPerPage;
  const indexOfFirstMateri = indexOfLastMateri - itemsPerPage;
  const currentMateri = materiData.slice(indexOfFirstMateri, indexOfLastMateri);

  return (
    <>
      {getPelajaran ? (
        <>
          <Card className="mb-5">
            <h5 className="text-2xl font-bold">{getPelajaran.pelajaran.nama_pelajaran}</h5>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Sekolah :</strong> {getPelajaran.pelajaran.asal_sekolah}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Kelas :</strong> {getPelajaran.pelajaran.jenjang_kelas}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Dibuat :</strong> {moment.tz(getPelajaran.pelajaran.createdAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Diubah :</strong> {moment.tz(getPelajaran.pelajaran.updatedAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Kreator :</strong> {getPelajaran.pelajaran.creator.nama_lengkap}
            </p>
            {/* Tombol Edit Pelajaran */}
            <Button 
              className="mt-4 w-auto px-4 mx-auto"
              onClick={() => handleEditPelajaran(getPelajaran.pelajaran.id)}
            >
              Edit Pelajaran
            </Button>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">List Materi</h3>
            <Button onClick={() => router.push(`/admin/materi/create?pelajaranId=${getPelajaran.pelajaran.id}&namaPelajaran=${getPelajaran.pelajaran.nama_pelajaran}`)}>
              Tambah Materi
            </Button>
          </div>

          {getPelajaran.pelajaran.materi.length === 0 ? (
            <p className="text-gray-400">Materi masih kosong</p>
          ) : (
            <>
              <InfoCardMateri 
                materis={currentMateri}
                refetchPelajaran={refetchPelajaran}
                routeRole="admin"
                setCurrentPage={setCurrentPage}
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
          )}
        </>
      ) : (
        <h1 className="text-2xl font-bold">Pelajaran Tidak Ditemukan</h1>
      )}
    </>
  );
}
