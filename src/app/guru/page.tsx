'use client'

import { usePelajaranControllerFindAllQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import DashboardLayoutGuru from "@/components/DashboardLayoutGuru"
import { useEffect } from "react";
import LoadingSkeletonDashboardGuru from "./loading";

export default function GuruPage () {
    const user = useSelector((state: RootState) => state.user)
    const { data: getAllPelajaran, isLoading: isLoadingAllPelajaran, isError: isErrorAllPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindAllQuery();

    useEffect(() => {
        refetchPelajaran();
    }, [refetchPelajaran]);
    
    return (
        <>
        {isLoadingAllPelajaran ? 
        <LoadingSkeletonDashboardGuru/> :
        isErrorAllPelajaran ? 
        <>
        <h1>Ada masalah silahkan refresh halaman</h1>
        </> :
        getAllPelajaran ?
        <>
        <h1 className="text-2xl font-bold">Dashboard Guru</h1>
        <DashboardLayoutGuru
        data={{
            jumlahPelajaran: getAllPelajaran.pelajaran.length
        }}
        />
        </>
        :
        <>
        <h1>Selamat Datang {user.nama_lengkap}</h1>
        <p>Tidak ada data</p>
        </>
        }
        </>
    )
}