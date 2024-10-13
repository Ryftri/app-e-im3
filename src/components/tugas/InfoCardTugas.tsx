'use client';

import { useTugasControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Tugas } from "@/types/response/GetOnePelajaran";
import { Button, Card, HR, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import ToastNotification from "../ToastNotification";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function InfoCardTugas({ 
    tugas,
    refetchPelajaran,
    routeRole,
    setCurrentPage,
} : {
    tugas: Tugas[],
    refetchPelajaran: () => void;
    routeRole: string;
    setCurrentPage: (page: number) => void;
}) {
    const router = useRouter();
    const [deleteTugas] = useTugasControllerRemoveMutation();
    const [isLoadingDeleteTugas, setIsLoadingDeleteTugas] = useState<boolean>(false);
    const [selectTugas, setSelectTugas] = useState<Tugas | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | null>(null);

    const openDeleteModal = (tugas: Tugas) => {
        setSelectTugas(tugas);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteTugas = async () => {
        if (selectTugas) {
            try {
                setIsLoadingDeleteTugas(true);
                const response = await deleteTugas({ 
                    id: selectTugas.id,
                    authorization: `Bearer ${getCookie('refreshToken')}`
                }).unwrap();
                setToastType('success');
                setToastMessage(`${response.message}`);
                refetchPelajaran();
                setIsDeleteModalOpen(false);
                setCurrentPage(1);
            } catch (error) {
                setToastType('error');
                setToastMessage(`${error}`);
            } finally {
                setIsLoadingDeleteTugas(false);
            }
        }
    };

    const closeDeleteModal = () => {
        setSelectTugas(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tugas.map((tugas) => (
                <Card className="max-w-sm" key={tugas.id}>
                    <h5 className="text-xl font-bold">{tugas.nama_tugas}</h5>
                    <HR />
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Kreator :</strong> {tugas.creator.nama_lengkap}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Dibuka :</strong> {moment.tz(tugas.openIn, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Deadline :</strong> {moment.tz(tugas.deadline, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                    </p>

                    <div className="flex w-full justify-between space-x-4 mt-4">
                        <Button className="flex-grow" 
                            onClick={() => router.push(`/${routeRole}/tugas/${tugas.id}`)}
                        >
                            Detail
                        </Button>
                        {routeRole === 'siswa' ? (
                            ''
                        ) : (
                            <Button className="flex-grow" color={'failure'} onClick={() => openDeleteModal(tugas)}>
                                Hapus
                            </Button>
                        )}
                    </div>
                </Card>
                ))}
            </div>
            
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <Modal.Header>Konfirmasi Penghapusan</Modal.Header>
                <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus tugas <strong>{selectTugas?.nama_tugas}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={handleDeleteTugas} disabled={isLoadingDeleteTugas}>
                    {isLoadingDeleteTugas ? <Spinner/> : "Hapus"}
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
    );
}
