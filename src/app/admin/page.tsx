"use client"

import DashboardLayoutAdmin from "@/components/DashboardLayoutAdmin";
import withAuth from "@/lib/HOC/withAuth";
import { usePelajaranControllerFindAllQuery, useUserControllerGetAllGuruQuery, useUserControllerGetAllSiswaQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { RootState, useAppSelector } from "@/lib/redux/store";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingSkeletonDashboardAdmin from "./loading";
import { getCookie } from "cookies-next";

export default function AdminPage () {
    const user = useSelector((state: RootState) => state.user)
    const { data: getAllGuru, isLoading: loadingAllGuru, isError: isErrorAllGuru, refetch: refetchGuru, isFetching: isRefetchGuru } = useUserControllerGetAllGuruQuery({
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const { data: getAllSiswa, isLoading: loadingAllSiswa, isError: isErrorAllSiswa, refetch: refetchSiswa, isFetching: isRefetchSiswa } = useUserControllerGetAllSiswaQuery({
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const { data: getAllPelajaran, isLoading: loadingAllPelajaran, isError: isErrorAllPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindAllQuery({
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    
    useEffect(() => {
        refetchGuru();
        refetchSiswa();
        refetchPelajaran();
    }, [refetchGuru, refetchSiswa, refetchPelajaran]);

    return (
        <>
        {loadingAllGuru || loadingAllSiswa || loadingAllPelajaran || isRefetchGuru || isRefetchSiswa || isRefetchPelajaran ?
        <LoadingSkeletonDashboardAdmin /> :
        isErrorAllGuru || isErrorAllSiswa || isErrorAllPelajaran ? 
        <>
        <h1>Ada masalah silahkan refresh halaman</h1>
        </>
        : getAllGuru && getAllSiswa && getAllPelajaran ?
        <>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <DashboardLayoutAdmin data={{
            jumlahGuru: getAllGuru.guru.length,
            jumlahSiswa: getAllSiswa.siswa.length,
            jumlahPelajaran: getAllPelajaran.pelajaran.length,
        }}/>
        </> :
        <>
        <h1>Selamat Datang {user.nama_lengkap}</h1>
        <p>Tidak ada data</p>
        </>
        }
        </>
    )
}