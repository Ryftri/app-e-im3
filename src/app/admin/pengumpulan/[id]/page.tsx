'use client'

import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { getCookie } from 'cookies-next';
import { usePengumpulanControllerFindOneQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import LoadingSkeletonGetOnePengumpulan from './loading';
import { Alert, Button, Card, ListGroup } from 'flowbite-react';
import TiptapView from '@/components/TitapView';

export default function PengumpulanPageById({ params }: { params: { id: string } }) {
    const { data: getPengumpulan, isLoading, isError, refetch, error } = usePengumpulanControllerFindOneQuery({
        id: Number(params.id),
        authorization: `Bearer ${getCookie('refreshToken')}`
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
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
                    </Card>
                </div>
            ) : (
                <Alert color="warning">
                    <span>Pengumpulan tidak ditemukan.</span>
                </Alert>
            )}
        </>
    );
}
