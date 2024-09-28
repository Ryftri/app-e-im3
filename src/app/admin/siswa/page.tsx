"use client"

import { Spinner, Table } from "flowbite-react"
import Link from "next/link";
import { useUserControllerGetAllSiswaQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";

export default function ListSiswaAdminPage () {
    const { data, error, isLoading } = useUserControllerGetAllSiswaQuery();

    if (isLoading) return (
        <div className="text-center">
            <Spinner size="xl"/>
        </div>
    );

    if (error) return <p>Error: {`${error}`}</p>;

    return (
        <>
            <Table>
                <Table.Head>
                <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data?.siswa.map(siswa => (
                        <Table.Row key={siswa.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {siswa.nama_lengkap}
                            </Table.Cell>
                            <Table.Cell>{siswa.username}</Table.Cell>
                            <Table.Cell>
                                <Link href={`siswa/${siswa.id}`} className="font-medium text-yellow-600 dark:text-yellow-300 hover:underline">
                                    Detail
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}