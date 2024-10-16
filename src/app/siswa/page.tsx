'use client'

import { usePengumpulanControllerFindAllQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { RootState } from "@/lib/redux/store";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingSkeletonDashboardSiswa from "./loading";
import DashboardLayoutSiswa from "@/components/DashboardLayoutSiswa";

export default function SiswaPage () {
    const user = useSelector((state: RootState) => state.user)
    const { data, isLoading, isError, refetch, isFetching } = usePengumpulanControllerFindAllQuery({
        authorization: `Bearer ${getCookie('refreshToken')}`
    });

    useEffect(() => {
        refetch();
    }, [refetch]);
    
    return (
        <>
        {isLoading ? 
            <LoadingSkeletonDashboardSiswa/> :
        isError ? 
        <>
        <h1>Ada masalah silahkan refresh halaman</h1>
        </> :
        data ?
        <>
        <h1 className="text-2xl font-bold">Dashboard Guru</h1>
        <DashboardLayoutSiswa
        data={{
            jumlahPenumpulanTugas: data.pengumpulan.length
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