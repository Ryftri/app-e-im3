'use client'

import { usePelajaranControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Pelajaran } from "@/types/response/GetPelajaranByQueryParams";
import { getCookie } from "cookies-next";
import { Button, Card, Modal, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const InfoCardPelajaranSiswa = ({ 
  pelajaran,
  refetchPelajaran,
  routeRole,
  setCurrentPage,
}: { 
  pelajaran: Pelajaran;
  refetchPelajaran: () => void;
  setCurrentPage: (page: number) => void;
  routeRole: string
  }) => {
    const [selectedPelajaran, setSelectedPelajaran] = useState<Pelajaran | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePelajaran] = usePelajaranControllerRemoveMutation();
    const [isLoadingDeletePelajaran, setIsLoadingDeletePelajaran] = useState<boolean>(false)
    const router = useRouter()

    const openDeleteModal = (pelajaran: Pelajaran) => {
      setSelectedPelajaran(pelajaran);
      setIsDeleteModalOpen(true);
    };

    const handleDeletePelajaran = async () => {
      if (selectedPelajaran) {
        try {
          setIsLoadingDeletePelajaran(true)
          await deletePelajaran({ 
            id: selectedPelajaran.id,
            authorization: `Bearer ${getCookie('refreshToken')}`
          });
          refetchPelajaran();
          setIsDeleteModalOpen(false);
          setCurrentPage(1)
        } catch (error) {
          console.error('Gagal menghapus pelajaran:', error);
        } finally {
          setIsLoadingDeletePelajaran(false)
        }
      }
    };
  
    const closeDeleteModal = () => {
      setSelectedPelajaran(null);
      setIsDeleteModalOpen(false);
    };

    return (
      <>
        <Card className="max-w-sm flex flex-col justify-between min-h-[200px]">
          <div className="flex-grow">
            <h5 className="text-2xl font-bold">{pelajaran.nama_pelajaran}</h5>
            <p className="text-gray-500">
              <strong>Sekolah :</strong> {pelajaran.asal_sekolah}
            </p>
            <p className="text-gray-500">
              <strong>Kelas :</strong> {pelajaran.jenjang_kelas}
            </p>
          </div>
          <div className="flex w-full justify-between space-x-4 mt-4">
            <Button className="flex-grow" onClick={() => router.push(`/${routeRole}/pelajaran/${pelajaran.id}`)}>
              Detail
            </Button>
            {routeRole === 'siswa' ?
              ''
              :
              <Button className="flex-grow" color={'failure'} onClick={() => openDeleteModal(pelajaran)}>
                Hapus
              </Button>
            }
          </div>
        </Card>

        {/* Modal Konfirmasi Penghapusan */}
        <Modal show={isDeleteModalOpen} onClose={!isLoadingDeletePelajaran ? closeDeleteModal : undefined}>
          <Modal.Header>Konfirmasi Penghapusan</Modal.Header>
          <Modal.Body>
            <p>Apakah Anda yakin ingin menghapus pelajaran <strong>{selectedPelajaran?.nama_pelajaran}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDeletePelajaran} disabled={isLoadingDeletePelajaran}>
              {isLoadingDeletePelajaran ?
              <Spinner/> :
              "Hapus"
              }
            </Button>
            <Button color="gray" onClick={closeDeleteModal} disabled={isLoadingDeletePelajaran}>
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};