"use client"

import { Button, Spinner, Table, Tabs } from "flowbite-react";
import Link from "next/link";
import { useUserControllerGetAllSiswaQuery, useUserControllerToggleActiveStatusMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlexibleLoadingText from "@/components/animations/FlexibleLoadingTextToPage";

export default function ListSiswaAdminPage() {
    const { data, error, isLoading, isError, refetch, isFetching } = useUserControllerGetAllSiswaQuery();
    const [toggleActiveUser, { isLoading: isLoadingActivateUser }] = useUserControllerToggleActiveStatusMutation();
    const [activeTab, setActiveTab] = useState("active");
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading && !isError) {
            refetch();
        }
    }, [isLoading, isError, refetch]);

    if (error) return <p>Error: {`${error}`}</p>;

    // Filter siswa based on their active status
    const activeSiswa = data?.siswa.filter(siswa => siswa.isActive);
    const inactiveSiswa = data?.siswa.filter(siswa => !siswa.isActive);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">List Siswa</h1>
                <Button onClick={() => router.push('/admin/siswa/create')}>
                    Tambah Siswa
                </Button>
            </div>

            {/* Tabs for active and inactive students */}
            <Tabs aria-label="Default tabs">
                <Tabs.Item active={activeTab === "active"} title="Siswa Aktif" onClick={() => setActiveTab("active")}>
                    {isLoading || isFetching ? (
                        <div className="text-center">
                            <Spinner size="xl" />
                        </div>
                    ) : (
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Aksi</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {activeSiswa && activeSiswa.length > 0 ? (
                                    activeSiswa.map((siswa) => (
                                        <Table.Row key={siswa.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {siswa.nama_lengkap}
                                            </Table.Cell>
                                            <Table.Cell>{siswa.username}</Table.Cell>
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button
                                                        onClick={() => router.push(`/admin/siswa/${siswa.id}`)}
                                                        color="warning"
                                                    >
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        color="failure"
                                                        onClick={async () => {
                                                            setLoadingId(siswa.id);
                                                            try {
                                                                await toggleActiveUser({
                                                                    id: Number(siswa.id),
                                                                    updateIsActiveDto: {
                                                                        isActive: false,
                                                                    },
                                                                }).unwrap();
                                                            } catch (error) {
                                                                console.log(error);
                                                            } finally {
                                                                setLoadingId(null);
                                                                refetch();
                                                            }
                                                        }}
                                                        disabled={loadingId === siswa.id}
                                                    >
                                                        {loadingId === siswa.id ? (
                                                            <FlexibleLoadingText textMessage="Menonaktifkan siswa" />
                                                        ) : (
                                                            "Nonaktifkan"
                                                        )}
                                                    </Button>
                                                </Button.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={3} className="text-center">
                                            Tidak ada siswa aktif
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    )}
                </Tabs.Item>

                <Tabs.Item active={activeTab === "inactive"} title="Siswa Tidak Aktif" onClick={() => setActiveTab("inactive")}>
                    {isLoading || isFetching ? (
                        <div className="text-center">
                            <Spinner size="xl" />
                        </div>
                    ) : (
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Aksi</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {inactiveSiswa && inactiveSiswa.length > 0 ? (
                                    inactiveSiswa.map((siswa) => (
                                        <Table.Row key={siswa.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {siswa.nama_lengkap}
                                            </Table.Cell>
                                            <Table.Cell>{siswa.username}</Table.Cell>
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button
                                                        onClick={() => router.push(`/admin/siswa/${siswa.id}`)}
                                                        color="warning"
                                                    >
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        color="success"
                                                        onClick={async () => {
                                                            setLoadingId(siswa.id);
                                                            try {
                                                                await toggleActiveUser({
                                                                    id: Number(siswa.id),
                                                                    updateIsActiveDto: {
                                                                        isActive: true,
                                                                    },
                                                                }).unwrap();
                                                            } catch (error) {
                                                                console.log(error);
                                                            } finally {
                                                                setLoadingId(null);
                                                                refetch();
                                                            }
                                                        }}
                                                        disabled={loadingId === siswa.id}
                                                    >
                                                        {loadingId === siswa.id ? (
                                                            <FlexibleLoadingText textMessage="Mengaktifkan siswa" />
                                                        ) : (
                                                            "Aktifkan"
                                                        )}
                                                    </Button>
                                                </Button.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={3} className="text-center">
                                            Tidak ada siswa tidak aktif
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    )}
                </Tabs.Item>
            </Tabs>
        </>
    );
}
