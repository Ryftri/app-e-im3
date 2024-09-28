"use client"

import DashboardLayoutAdmin from "@/components/DashboardLayoutAdmin";
import withAuth from "@/lib/HOC/withAuth";
import { usePelajaranControllerFindAllQuery, useUserControllerGetAllGuruQuery, useUserControllerGetAllSiswaQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { RootState, useAppSelector } from "@/lib/redux/store";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminPage () {
    const user = useSelector((state: RootState) => state.user)
    const { data: getAllGuru, isLoading: loadingAllGuru, isError: isErrorAllGuru, refetch: refetchGuru, isFetching: isRefetchGuru } = useUserControllerGetAllGuruQuery();
    const { data: getAllSiswa, isLoading: loadingAllSiswa, isError: isErrorAllSiswa, refetch: refetchSiswa, isFetching: isRefetchSiswa } = useUserControllerGetAllSiswaQuery();
    const { data: getAllPelajaran, isLoading: loadingAllPelajaran, isError: isErrorAllPelajaran, refetch: refetchPelajaran, isFetching: isRefetchPelajaran } = usePelajaranControllerFindAllQuery();
    
    useEffect(() => {
        refetchGuru();
        refetchSiswa();
        refetchPelajaran();
    }, [refetchGuru, refetchSiswa, refetchPelajaran]);

    return (
        <>
        {loadingAllGuru || loadingAllSiswa || loadingAllPelajaran || isRefetchGuru || isRefetchSiswa || isRefetchPelajaran ?
        <Spinner size="lg" /> :
        isErrorAllGuru || isErrorAllSiswa || isErrorAllPelajaran ? 
        <>
        <h1>Ada masalah silahkan refresh halaman</h1>
        </>
        : getAllGuru && getAllSiswa && getAllPelajaran ?
        <>
        <h1>Selamat Datang {user.nama_lengkap}</h1>
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