"use client"

import { Button, Spinner, Table, Tabs } from "flowbite-react"
import Link from "next/link";
import { useUserControllerGetAllGuruQuery, useUserControllerToggleActiveStatusMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlexibleLoadingText from "@/components/animations/FlexibleLoadingTextToPage";
import { getCookie } from "cookies-next";

export default function ListGuruAdminPage () {
    const { data, error, isLoading, isError, refetch, isFetching } = useUserControllerGetAllGuruQuery({
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const [ toggleActiveUser, { isLoading: isLoadingActivateUser } ] = useUserControllerToggleActiveStatusMutation();
    const [activeTab, setActiveTab] = useState("active");
    const router = useRouter()
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading && !isError) {
            refetch();
        }
    }, [isLoading, isError, refetch]);

    if (error) return <p>Error: {`${error}`}</p>;

    // Filter guru based on their active status
    const activeGuru = data?.guru.filter(guru => guru.isActive);
    const inactiveGuru = data?.guru.filter(guru => !guru.isActive);

    return (
        <>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Daftar Guru</h1>
            <Button onClick={() => router.push('/admin/guru/create')}>
                Tambah Guru
            </Button>
        </div>

        {/* Tabs for active and inactive gurus */}
        <Tabs aria-label="Default tabs">
            <Tabs.Item active={activeTab === "active"} title="Guru Aktif" onClick={() => setActiveTab("active")}>
            {isLoading || isFetching ? 
                <div className="text-center">
                    <Spinner size="xl" />
                </div>
                :
                <Table>
                    <Table.Head>
                    <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                    <Table.HeadCell>Asal Sekolah</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {activeGuru && activeGuru.length > 0 ? 
                        activeGuru.map(guru => (
                        <Table.Row key={guru.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {guru.nama_lengkap}
                            </Table.Cell>
                            <Table.Cell>{guru.asal_sekolah}</Table.Cell>
                            <Table.Cell>
                                <Button.Group>
                                    <Button 
                                        onClick={() => router.push(`/admin/guru/${guru.id}`)}
                                        color="warning"
                                    >
                                        Detail
                                    </Button>
                                    <Button
                                        color="failure"
                                        onClick={async () => {
                                            setLoadingId(guru.id);
                                            try {
                                                await toggleActiveUser({
                                                    id: Number(guru.id),
                                                    updateIsActiveDto: {
                                                        isActive: false
                                                    },
                                                    authorization: `Bearer ${getCookie('refreshToken')}`
                                                }).unwrap();
                                            } catch (error) {
                                                console.log(error);
                                            } finally {
                                                setLoadingId(null);
                                                refetch();
                                            }
                                        }}
                                        disabled={loadingId === guru.id}
                                    >
                                        {loadingId === guru.id ? <FlexibleLoadingText textMessage="Menonktifkan user" /> : "Nonaktifkan" }
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                        )) : 
                        <Table.Row>
                        <Table.Cell colSpan={4} className="text-center">Tidak ada guru aktif</Table.Cell>
                        </Table.Row>
                    }
                    </Table.Body>
                </Table>
            }
            </Tabs.Item>
            <Tabs.Item active={activeTab === "inactive"} title="Guru Tidak Aktif" onClick={() => setActiveTab("inactive")}>
            {isLoading || isFetching ? 
                <div className="text-center">
                    <Spinner size="xl" />
                </div>
                :
                <Table>
                    <Table.Head>
                    <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                    <Table.HeadCell>Asal Sekolah</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {inactiveGuru && inactiveGuru.length > 0 ? 
                        inactiveGuru.map(guru => (
                        <Table.Row key={guru.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {guru.nama_lengkap}
                            </Table.Cell>
                            <Table.Cell>{guru.asal_sekolah}</Table.Cell>
                            <Table.Cell>
                                <Button.Group>
                                    <Button 
                                        onClick={() => router.push(`/admin/guru/${guru.id}`)}
                                        color="warning"
                                    >
                                        Detail
                                    </Button>
                                    <Button
                                        color="success"
                                        onClick={async () => {
                                            setLoadingId(guru.id);
                                            try {
                                                await toggleActiveUser({
                                                    id: Number(guru.id),
                                                    updateIsActiveDto: {
                                                        isActive: true
                                                    },
                                                    authorization: `Bearer ${getCookie('refreshToken')}`
                                                }).unwrap();
                                            } catch (error) {
                                                console.log(error);
                                            } finally {
                                                setLoadingId(null);
                                                refetch();
                                            }
                                        }}
                                        disabled={loadingId === guru.id}
                                    >
                                        {loadingId === guru.id ? <FlexibleLoadingText textMessage="Mengaktifkan user" /> : 'Aktifkan'}
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                        )) : 
                        <Table.Row>
                        <Table.Cell colSpan={4} className="text-center">Tidak ada guru tidak aktif</Table.Cell>
                        </Table.Row>
                    }
                    </Table.Body>
                </Table>
            }
            </Tabs.Item>
        </Tabs>
        </>
    );
}