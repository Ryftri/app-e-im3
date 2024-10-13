'use client';

import { usePengumpulanControllerRemoveMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { Button, Card, HR, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import ToastNotification from "../ToastNotification";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Pengumpulan } from "@/types/response/GetTugasById";

export default function InfoCardPengumpulan({ 
    pengumpuls,
    refetchTugas,
    routeRole,
    setCurrentPage,
}: {
    pengumpuls: Pengumpulan[],
    refetchTugas: () => void;
    routeRole: string;
    setCurrentPage: (page: number) => void;
}) {
    const router = useRouter();
    const [deletePengumpulan] = usePengumpulanControllerRemoveMutation();
    const [isLoadingDeletePengumpulan, setIsLoadingDeletePengumpulan] = useState<boolean>(false);
    const [selectPengumpulan, setSelectPengumpulan] = useState<Pengumpulan | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | null>(null);

    const openDeleteModal = (pengumpulan: Pengumpulan) => {
        setSelectPengumpulan(pengumpulan);
        setIsDeleteModalOpen(true);
    };

    const handleDeletePengumpulan = async () => {
        if (selectPengumpulan) {
            try {
                setIsLoadingDeletePengumpulan(true);
                const response = await deletePengumpulan({ 
                    id: selectPengumpulan.id,
                    authorization: `Bearer ${getCookie('refreshToken')}`
                }).unwrap();
                setToastType('success');
                setToastMessage(`${response.message}`);
                refetchTugas();
                setIsDeleteModalOpen(false);
                setCurrentPage(1);
            } catch (error) {
                setToastType('error');
                setToastMessage(`${error}`);
            } finally {
                setIsLoadingDeletePengumpulan(false);
            }
        }
    };

    const closeDeleteModal = () => {
        setSelectPengumpulan(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pengumpuls.map((pengumpulan) => (
                    <Card className="max-w-sm" key={pengumpulan.id}>
                        <h5 className="text-xl font-bold">{pengumpulan.pengumpul.nama_lengkap}</h5>
                        <HR />
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Dikumpulkan :</strong> {moment.tz(pengumpulan.createdAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY HH:mm')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Diubah :</strong> {moment.tz(pengumpulan.updatedAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY HH:mm')}
                        </p>

                        <div className="flex w-full justify-between space-x-4 mt-4">
                            <Button className="flex-grow" 
                                onClick={() => router.push(`/guru/pengumpulan/${pengumpulan.id}`)} // Sesuaikan dengan rute detail pengumpulan
                            >
                                Detail
                            </Button>
                            {routeRole !== 'siswa' && (
                                <Button className="flex-grow" color={'failure'} onClick={() => openDeleteModal(pengumpulan)}>
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
                    <p>Apakah Anda yakin ingin menghapus pengumpulan <strong>{selectPengumpulan?.pengumpul.nama_lengkap}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={handleDeletePengumpulan} disabled={isLoadingDeletePengumpulan}>
                        {isLoadingDeletePengumpulan ? <Spinner /> : "Hapus"}
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
