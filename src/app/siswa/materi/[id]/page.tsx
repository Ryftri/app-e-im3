'use client'

import TiptapView from "@/components/TitapView";
import { useMateriControllerFindOneQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSkeletonGetOnePelajaran from "../../pelajaran/[id]/loading";
import { Alert, Button, Card, ListGroup } from "flowbite-react";
import LoadingSkeletonGetOneMateri from "./loading";
import { getCookie } from "cookies-next";

export default function MateriPageById({ params }: { params: { id: string } }) {
    const { data: getMateri, isLoading: isLoadingMateri, isError: isErrorMateri, refetch: refetchMateri, isFetching: isRefetchMateri, error: errorMateriFetch } = useMateriControllerFindOneQuery({
        id: Number(params.id),
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const [isiMateri, setIsiMateri] = useState('');
    const router = useRouter()

    useEffect(() => {
        refetchMateri()
    }, [refetchMateri])

    if(isLoadingMateri || isRefetchMateri) {
        return <LoadingSkeletonGetOneMateri/>
    }

    if (isErrorMateri) {
        return (
            <Alert color="failure">
                <span>{errorMateriFetch.message || "Terjadi kesalahan saat mengambil data."}</span>
            </Alert>
        );
    }

    return (
        <>
        {getMateri ? 
            <div className="p-4">
                <Card>
                    <h2 className="text-xl font-semibold">{getMateri.materi.nama_materi}</h2>
                    <TiptapView content={getMateri.materi.isi_materi} onChange={() => {}} />
            
                    <h3 className="text-lg font-semibold mt-6">File Materi</h3>
                    <ListGroup>
                        {getMateri.materi.files.map((file: any, index: number) => (
                        <ListGroup.Item key={index} className="flex justify-between" onClick={() => window.open(file.fileUrl, '_blank')}>
                            <a rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {file.originalName}
                            </a>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
            
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Detail Pelajaran</h3>
                        <p><strong>Nama Pelajaran:</strong> {getMateri.materi.pelajaran.nama_pelajaran}</p>
                        <p><strong>Asal Sekolah:</strong> {getMateri.materi.pelajaran.asal_sekolah}</p>
                        <p><strong>Jenjang Kelas:</strong> Kelas {getMateri.materi.pelajaran.jenjang_kelas}</p>
                    </div>
                </Card>
            </div> :
            <Alert color="warning">
                <span>Materi tidak ditemukan.</span>
            </Alert>
        }
        </>
    )
}