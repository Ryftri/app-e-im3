'use client'

import { useMateriControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Materi } from "@/types/GetAllPelajaran";
import { Button, Card, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import ToastNotification from "../ToastNotification";
import { useRouter } from "next/navigation";

export default function InfoCardMateri({ 
    materis,
    refetchPelajaran,
    routeRole
} : {
    materis: Materi[],
    refetchPelajaran: () => void;
    routeRole: string
}
) {
    const router = useRouter()
    const [ deleteMateri ] = useMateriControllerRemoveMutation()
    const [isLoadingDeleteMateri, setIsLoadingDeleteMateri] = useState<boolean>(false)
    const [selectMateri, setSelectMateri] = useState<Materi | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | null>(null);

    const openDeleteModal = (materi: Materi) => {
        setSelectMateri(materi);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteMateri = async () => {
        if (selectMateri) {
            try {
                setIsLoadingDeleteMateri(true)
                const response = await deleteMateri({ id: selectMateri.id }).unwrap();
                setToastType('success')
                setToastMessage(`${response.message}`)
                refetchPelajaran();
                setIsDeleteModalOpen(false);
            } catch (error) {
                setToastType('error')
                setToastMessage(`${error}`)
            } finally {
                setIsLoadingDeleteMateri(false)
            }
        }
    };

    const closeDeleteModal = () => {
        setSelectMateri(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {materis.map((materi) => (
                <Card className="max-w-sm" key={materi.id}>
                    <h5 className="text-xl font-bold">{materi.nama_materi}</h5>
                    <p className="text-gray-300">
                    <strong>Kreator :</strong> {materi.creatorId}
                    </p>
                    <p className="text-gray-300">
                    <strong>Dibuat :</strong> {moment.tz(materi.createdAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                    </p>
                    <p className="text-gray-300">
                    <strong>Diubah :</strong> {moment.tz(materi.updatedAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                    </p>

                    <div className="flex w-full justify-between space-x-4 mt-4">
                        <Button className="flex-grow" 
                            onClick={() => router.push(`/${routeRole}/materi/${materi.id}`)}
                        >
                            Detail
                        </Button>
                        <Button className="flex-grow" color={'failure'} onClick={() => openDeleteModal(materi)}>
                            Hapus
                        </Button>
                    </div>
                </Card>
                ))}
            </div>
            
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <Modal.Header>Konfirmasi Penghapusan</Modal.Header>
                <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus pelajaran <strong>{selectMateri?.nama_materi}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={handleDeleteMateri} disabled={isLoadingDeleteMateri}>
                    {isLoadingDeleteMateri ?
                    <Spinner/> :
                    "Hapus"
                    }
                    </Button>
                    <Button color="gray" onClick={closeDeleteModal}>
                    Batal
                    </Button>
                </Modal.Footer>
            </Modal>

            {toastMessage && (
                <div className="fixed bottom-4 right-4">
                    <ToastNotification
                    message={toastMessage}
                    type={toastType!}
                    onClose={() => setToastMessage(null)} // Hilangkan toast setelah ditutup
                    />
                </div>
            )}
        </>
    )
}