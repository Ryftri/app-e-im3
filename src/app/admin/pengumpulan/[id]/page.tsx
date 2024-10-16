'use client';

import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { getCookie } from 'cookies-next';
import { useNilaiControllerCreateMutation, useNilaiControllerUpdateMutation, usePengumpulanControllerFindOneQuery, } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import LoadingSkeletonGetOnePengumpulan from './loading';
import { Alert, Button, Card, Label, ListGroup, TextInput } from 'flowbite-react';
import TiptapView from '@/components/TitapView';
import { ToastNotificationProps } from '@/types/Toas';
import ToastNotification from '@/components/ToastNotification';
import { GlobalResponse } from '@/types/GlobalResponse';

export default function PengumpulanPageById({ params }: { params: { id: string } }) {
    const { data: getPengumpulan, isLoading, isError, refetch, error, isFetching } = usePengumpulanControllerFindOneQuery({
        id: Number(params.id),
        authorization: `Bearer ${getCookie('refreshToken')}`
    });

    const [nilai, setNilai] = useState<number | null | undefined>(null);
    const [createNilai, { isLoading: isCreating }] = useNilaiControllerCreateMutation();
    const [updateNilai, { isLoading: isUpdating }] = useNilaiControllerUpdateMutation();
    const [toast, setToast] = useState<ToastNotificationProps | null>(null);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if(getPengumpulan?.pengumpulan.nilai?.nilai !== null){
            setNilai(getPengumpulan?.pengumpulan.nilai?.nilai);
        }
    }, [getPengumpulan]);


    const handleUploadNilai = async () => {
        try {
            if (getPengumpulan?.pengumpulan.nilai !== null) {
                const  response = await updateNilai({
                    id: getPengumpulan?.pengumpulan.nilai?.id ?? 0, 
                    updateNilaiDto: {
                        nilai: nilai ?? 0,
                        pengumpulanId: getPengumpulan?.pengumpulan.pengumpulId ?? 0
                    },
                    authorization: `Bearer ${getCookie('refreshToken')}`
                }).unwrap();
                console.log(response)
                setToast({
                    message: `${response.message}`,
                    type: "success",
                    onClose: () => setToast(null),
                });
            } else {
                console.log('buat nilai')
                const response = await createNilai({
                    createNilaiDto: {
                        pengumpulanId: getPengumpulan?.pengumpulan.id ?? 0,
                        nilai: nilai ?? 200
                    },
                    authorization: `Bearer ${getCookie('refreshToken')}`
                }).unwrap();
                setToast({
                    message: `${response.message}`,
                    type: "success",
                    onClose: () => setToast(null),
                });
            }

            await refetch();
        } catch (err) {
            const error = err as GlobalResponse
            setToast({
                message: `${error.message}`,
                type: "error",
                onClose: () => setToast(null),
            });
        }
    };

    if (isLoading || isFetching) {
        return <LoadingSkeletonGetOnePengumpulan />;
    }

    if (isError) {
        return (
            <Alert color="failure">
                <span>{error.message || "Terjadi kesalahan saat mengambil data."}</span>
            </Alert>
        );
    }

    return (
        <>
            {getPengumpulan ? (
                <div className="p-4">
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{getPengumpulan.pengumpulan.tugas.nama_tugas}</h2>
                        </div>

                        <h3 className="text-lg font-semibold">Detail Pengumpulan</h3>
                        <p><strong>Nama Pengumpul:</strong> {getPengumpulan.pengumpulan.pengumpul.nama_lengkap}</p>
                        <TiptapView content={getPengumpulan.pengumpulan.detail_pengumpulan || "Tidak ada detail."} onChange={() => {}} />
                        <p><strong>Waktu Pengumpulan:</strong> {moment.tz(getPengumpulan.pengumpulan.createdAt, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY, HH:mm')}</p>

                        <h3 className="text-lg font-semibold mt-6">File Pengumpulan</h3>
                        <ListGroup>
                            {getPengumpulan.pengumpulan.files.map((file, index) => (
                                <ListGroup.Item key={index} className="flex justify-between" onClick={() => window.open(file.fileUrl, '_blank')}>
                                    <a rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {file.originalName}
                                    </a>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Detail Tugas</h3>
                            <p><strong>Nama Tugas:</strong> {getPengumpulan.pengumpulan.tugas.nama_tugas}</p>
                            <p><strong>Dibuka pada:</strong> {moment.tz(getPengumpulan.pengumpulan.tugas.openIn, 'Asia/Jakarta').locale('id').format('DD MMMM YYYY, HH:mm')}</p>
                            <p><strong>Batas Waktu:</strong> {moment.tz(getPengumpulan.pengumpulan.tugas.deadline, 'Asia/Jakarta').locale('id').format('DD MMMM YYYY, HH:mm')}</p>
                        </div>

                        <div className="mt-6">
                            <Label className="block mb-2 text-sm font-medium text-gray-900">Nilai:</Label>
                            <TextInput
                                type="number"
                                value={nilai || ""}
                                onChange={(e) => setNilai(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder="Masukkan nilai"
                                required
                            />
                            <Button onClick={handleUploadNilai} className="mt-2" disabled={isCreating || isUpdating}>
                                {nilai ? "Ubah Nilai" : "Unggah Nilai"}
                            </Button>
                        </div>
                    </Card>
                    {toast && (
                        <div className="fixed bottom-4 right-4">
                            <ToastNotification
                                message={toast.message}
                                type={toast.type}
                                onClose={toast.onClose}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <Alert color="warning">
                    <span>Pengumpulan tidak ditemukan.</span>
                </Alert>
            )}
        </>
    );
}
