"use client"

import { Spinner, Table } from "flowbite-react"
import Link from "next/link";
import { useUserControllerGetAllGuruQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useEffect } from "react";

export default function ListGuruAdminPage () {
    const { data, error, isLoading, isError, refetch, isFetching } = useUserControllerGetAllGuruQuery();

    useEffect(() => {
        if (!isLoading && !isError) {
          refetch(); // Refetch data setelah update atau delete
        }
    }, [isLoading, isError, refetch]);

    if (isLoading || isFetching) return (
        <div className="text-center">
            <Spinner size="xl" />
        </div>
    );

    if (error) return <p>Error: {`${error}`}</p>;

    return (
    <Table>
        <Table.Head>
        <Table.HeadCell>Nama Lengkap</Table.HeadCell>
        <Table.HeadCell>Role</Table.HeadCell>
        <Table.HeadCell>Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {data !== undefined ? 
            data.guru.map(guru => (
                <Table.Row key={guru.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {guru.nama_lengkap}
                    </Table.Cell>
                    <Table.Cell>{guru.role.role}</Table.Cell>
                    <Table.Cell>
                        <Link href={`guru/${guru.id}`} className="font-medium text-yellow-600 dark:text-yellow-300 hover:underline">
                            Detail
                        </Link>
                    </Table.Cell>
                </Table.Row>
            )): 
            <p>Kosong</p>
            }
        </Table.Body>
    </Table>
    )
}