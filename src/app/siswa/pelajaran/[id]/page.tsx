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
import InfoCardTugas from "@/components/tugas/InfoCardTugas";

export default function PelajaranPageById({ params }: { params: { id: string } }) {
  const { data: getPelajaran, isLoading: isLoadingPelajaran, isError: isErrorPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindOneQuery({
    id: Number(params.id),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });
  const router = useRouter()

  const [currentPageMateri, setCurrentPageMateri] = useState(1);
  const [currentPageTugas, setCurrentPageTugas] = useState(1);
  const itemsPerPage = 6;
  
  useEffect(() => {
    refetchPelajaran()
  }, [refetchPelajaran])

  if(isLoadingPelajaran || isRefetchPelajaran) {
    return <LoadingSkeletonGetOnePelajaran/>
  }

  const materiData = getPelajaran?.pelajaran.materi || [];
  const tugasData = getPelajaran?.pelajaran.tugas || [];
  
  const totalMateri = materiData.length;
  const totalTugas = tugasData.length;
  
  const totalPagesMateri = Math.ceil(totalMateri / itemsPerPage);
  const totalPagesTugas = Math.ceil(totalTugas / itemsPerPage);

  const indexOfLastMateri = currentPageMateri * itemsPerPage;
  const indexOfFirstMateri = indexOfLastMateri - itemsPerPage;
  const currentMateri = materiData.slice(indexOfFirstMateri, indexOfLastMateri);

  const indexOfLastTugas = currentPageTugas * itemsPerPage;
  const indexOfFirstTugas = indexOfLastTugas - itemsPerPage;
  const currentTugas = tugasData.slice(indexOfFirstTugas, indexOfLastTugas);

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
          </Card>

          <h3 className="text-2xl font-bold">Daftar Materi</h3>

          {getPelajaran.pelajaran.materi.length === 0 ? (
            <p className="text-gray-400">Materi masih kosong</p>
          ) : (
          <>
            <InfoCardMateri 
              materis={currentMateri}
              refetchPelajaran={refetchPelajaran}
              routeRole="siswa"
              setCurrentPage={setCurrentPageMateri}
            />
            <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPageMateri}
                  totalPages={totalPagesMateri}
                  onPageChange={(page) => setCurrentPageMateri(page)}
                  showIcons
                  previousLabel="Kembali"
                  nextLabel="Lanjutkan"
                />
            </div>
          </>
          )}

          <h3 className="text-2xl font-bold">Daftar Tugas</h3>

          {getPelajaran.pelajaran.tugas.length === 0 ? (
            <p className="text-gray-400">Tugas masih kosong</p>
          ) : (
          <>
            <InfoCardTugas 
              tugas={currentTugas}
              refetchPelajaran={refetchPelajaran}
              routeRole="siswa"
              setCurrentPage={setCurrentPageTugas}
            />
            <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPageTugas}
                  totalPages={totalPagesTugas}
                  onPageChange={(page) => setCurrentPageTugas(page)}
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
