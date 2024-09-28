'use client'

import { usePelajaranControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Pelajaran } from "@/types/GetAllPelajaran";
import { Button, Card, Modal, Spinner } from "flowbite-react";
import { useState } from "react";

export const InfoCardPelajaran = ({ 
  pelajaran,
  refetchPelajaran,
}: { 
  pelajaran: Pelajaran;
  refetchPelajaran: () => void
  }) => {
    const [selectedPelajaran, setSelectedPelajaran] = useState<Pelajaran | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePelajaran] = usePelajaranControllerRemoveMutation();
    const [isLoadingDeletePelajaran, setIsLoadingDeletePelajaran] = useState<boolean>(false)

    const openDeleteModal = (pelajaran: Pelajaran) => {
      setSelectedPelajaran(pelajaran);
      setIsDeleteModalOpen(true);
    };

    const handleDeletePelajaran = async () => {
      if (selectedPelajaran) {
        try {
          setIsLoadingDeletePelajaran(true)
          await deletePelajaran({ id: selectedPelajaran.id });
          refetchPelajaran();
          setIsDeleteModalOpen(false);
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
        <Card className="max-w-sm">
          <h5 className="text-2xl font-bold">{pelajaran.nama_pelajaran}</h5>
          <p className="text-gray-500">
            <strong>Sekolah :</strong> {pelajaran.asal_sekolah}
          </p>
          <p className="text-gray-500">
            <strong>Kelas   :</strong> {pelajaran.jenjang_kelas}
          </p>

          <div className="flex w-full justify-between space-x-4">
            <Button className="flex-grow" onClick={() => console.log(pelajaran)}>
              Detail
            </Button>
            <Button className="flex-grow" color={'failure'} onClick={() => openDeleteModal(pelajaran)}>
              Hapus
            </Button>
          </div>
        </Card>

        {/* Modal Konfirmasi Penghapusan */}
        <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
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
            <Button color="gray" onClick={closeDeleteModal}>
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };