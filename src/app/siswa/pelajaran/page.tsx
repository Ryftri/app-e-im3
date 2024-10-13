"use client"

import { usePelajaranControllerFindBySekolahAndJenjangQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { useEffect, useState } from 'react';
import LoadingSkeletonListPelajaran from './loading';
import { Pagination } from 'flowbite-react';
import PelajaranDashboardSiswa from '@/components/pelajaran/siswa/PelajaranDashboardSiswa';
import { useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function PelajaranPage() {
  const searchParams = useSearchParams(); 
  const asalSekolah = searchParams.get('asalSekolah');
  const jenjang = searchParams.get('jenjang');

  const { data: getPelajaran, isLoading: isLoadingPelajaran, isError: isErrorPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindBySekolahAndJenjangQuery({
    sekolah: asalSekolah as string,
    jenjang: Number(jenjang),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    refetchPelajaran();
  }, [refetchPelajaran]);

  if (isLoadingPelajaran || isRefetchPelajaran) {
    return <LoadingSkeletonListPelajaran />;
  }

  if (isErrorPelajaran) {
    return <div>Error memuat data pelajaran</div>;
  }

  const pelajaranData = getPelajaran?.pelajaran || [];
  const totalPelajaran = pelajaranData.length;
  const totalPages = Math.ceil(totalPelajaran / itemsPerPage);

  const indexOfLastPelajaran = currentPage * itemsPerPage;
  const indexOfFirstPelajaran = indexOfLastPelajaran - itemsPerPage;
  const currentPelajaran = pelajaranData.slice(indexOfFirstPelajaran, indexOfLastPelajaran);

  return (
    <>
      <h1 className="text-2xl font-bold">List Pelajaran</h1>

      {/* Dashboard Pelajaran */}
      <PelajaranDashboardSiswa
        data={{
          pelajaran: currentPelajaran,
        }}
        setCurrentPage={setCurrentPage}
        refetchPelajaran={refetchPelajaran}
        routeRole="siswa"
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
