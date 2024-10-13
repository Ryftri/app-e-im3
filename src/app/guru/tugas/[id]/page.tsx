'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { useTugasControllerFindOneQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import LoadingSkeletonGetOneTugas from "./loading";
import { Button, Card, ListGroup, Pagination } from "flowbite-react";
import InfoCardPengumpulan from "@/components/pengumpulan/InfoCardPengumpulan";

export default function TugasPageById({ params }: { params: { id: string } }) {
    const { data: getTugas, isLoading: isLoadingTugas, isError: isErrorTugas, refetch: refetchTugas, isFetching: isRefetchTugas } = useTugasControllerFindOneQuery({
        id: Number(params.id),
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const router = useRouter();

    const [currentPagePengumpulan, setCurrentPagePengumpulan] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        refetchTugas();
    }, [refetchTugas]);
    
    if (isLoadingTugas || isRefetchTugas) {
        return <LoadingSkeletonGetOneTugas />;
    }

    const pengumpulanData = getTugas?.tugas.pengumpulan || [];
    
    const totalPengumpulan = pengumpulanData.length;
    
    const totalPagesPengumpulan = Math.ceil(totalPengumpulan / itemsPerPage);

    const indexOfLastPengumpulan = currentPagePengumpulan * itemsPerPage;
    const indexOfFirstPengumpulan = indexOfLastPengumpulan - itemsPerPage;
    const currentPengumpulan = pengumpulanData.slice(indexOfFirstPengumpulan, indexOfLastPengumpulan);
    
    return (
        <>
            {getTugas ? (
            <>
                <Card className="mb-5">
                <h5 className="text-2xl font-bold">{getTugas.tugas.nama_tugas}</h5>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Dibuka pada :</strong> {moment.tz(getTugas.tugas.openIn, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Deadline :</strong> {moment.tz(getTugas.tugas.deadline, 'Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY')}
                </p>

                <h3 className="text-lg font-semibold mt-6">File Tugas</h3>
                <ListGroup>
                    {getTugas.tugas.files.map((file: any, index: number) => (
                    <ListGroup.Item key={index} className="flex justify-between" onClick={() => window.open(file.fileUrl, '_blank')}>
                        <a rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {file.originalName}
                        </a>
                    </ListGroup.Item>
                    ))}
                </ListGroup>

                <Button 
                    className="mt-4 w-auto px-4 mx-auto"
                    onClick={() => router.push(`/guru/tugas/edit?tugasId=${getTugas.tugas.id}&pelajaranId=${getTugas.tugas.pelajaranId}`)}
                >
                    Edit Tugas
                </Button>
                </Card>

                <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">List Pengumpulan</h3>
                </div>

                {getTugas.tugas.pengumpulan.length === 0 ? (
                <p className="text-gray-400">Belum ada yang mengumpulkan</p>
                ) : (
                <>
                <InfoCardPengumpulan 
                    pengumpuls={currentPengumpulan}
                    refetchTugas={refetchTugas}
                    routeRole="guru"
                    setCurrentPage={setCurrentPagePengumpulan}
                />
                <div className="flex justify-center mt-4">
                    <Pagination
                        currentPage={currentPagePengumpulan}
                        totalPages={totalPagesPengumpulan}
                        onPageChange={(page) => setCurrentPagePengumpulan(page)}
                        showIcons
                        previousLabel="Kembali"
                        nextLabel="Lanjutkan"
                    />
                </div>
                </>
                )}
            </>
            ) : (
            <h1 className="text-2xl font-bold">Tugas Tidak Ditemukan</h1>
            )}
        </>
    );
}
