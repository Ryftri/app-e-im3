'use client'

import { usePelajaranControllerFindOneQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Button, Card, Modal, Spinner } from "flowbite-react";
import { useEffect } from "react";
import LoadingSkeletonGetOnePelajaran from "./loading";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { useRouter } from "next/navigation";

export default function PelajaranPageById({ params }: { params: { id: string } }) {
  const { data: getPelajaran, isLoading: isLoadingPelajaran, isError: isErrorPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindOneQuery({
    id: Number(params.id)
  });
  const router = useRouter()
  
  useEffect(() => {
    refetchPelajaran()
  }, [refetchPelajaran])

  function handleEditPelajaran(id: number) {
    router.push(`/guru/pelajaran/edit/${id}`);
    // alert(`Id Pelajaran ${id}`)
  }

  function handleEditMateri(id: number) {
    router.push(`/guru/materi/edit/${id}`);
    // alert(`Id Pelajaran ${id}`)
  }

  if(isLoadingPelajaran || isRefetchPelajaran) {
    return <LoadingSkeletonGetOnePelajaran/>
  }

  return (
    <>
      {getPelajaran ? (
        <>
          <Card className="mb-5">
            <h5 className="text-2xl font-bold">{getPelajaran.pelajaran.nama_pelajaran}</h5>
            <p className="text-gray-300">
              <strong>Sekolah :</strong> {getPelajaran.pelajaran.asal_sekolah}
            </p>
            <p className="text-gray-300">
              <strong>Kelas :</strong> {getPelajaran.pelajaran.jenjang_kelas}
            </p>
            <p className="text-gray-300">
              <strong>Dibuat :</strong> {moment.tz(getPelajaran.pelajaran.createdAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
            </p>
            <p className="text-gray-300">
              <strong>Diubah :</strong> {moment.tz(getPelajaran.pelajaran.updatedAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
            </p>
            <p className="text-gray-300">
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
            <Button onClick={() => router.push(`/guru/materi/create?pelajaranId=${getPelajaran.pelajaran.id}&namaPelajaran=${getPelajaran.pelajaran.nama_pelajaran}`)}>
              Tambah Materi
            </Button>
          </div>

          {getPelajaran.pelajaran.materi.length === 0 ? (
            <p className="text-gray-400">Materi masih kosong</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getPelajaran.pelajaran.materi.map((materi) => (
                <Card className="max-w-sm" key={materi.id}>
                  <h5 className="text-xl font-bold">{materi.nama_materi}</h5>
                  <p className="text-gray-300">
                    <strong>Isi Materi :</strong> {materi.isi_materi}
                  </p>
                  <p className="text-gray-300">
                    <strong>Kreator :</strong> {materi.creatorId}
                  </p>
                  <p className="text-gray-300">
                    <strong>Dibuat :</strong> {new Date(materi.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    <strong>Diubah :</strong> {new Date(materi.updatedAt).toLocaleDateString()}
                  </p>
                  {/* Tombol Edit Materi */}
                  <Button className="mt-4" onClick={() => handleEditMateri(materi.id)}>
                    Edit Materi
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <h1 className="text-2xl font-bold">Pelajaran Tidak Ditemukan</h1>
      )}
    </>
  );
}
