"use client"

import { Button, Card, List, Modal, Spinner, Table } from "flowbite-react";
import moment from 'moment';
import 'moment/locale/id';
import 'moment-timezone';
import { useUserControllerDeleteMutation, useUserControllerFinOneGuruQuery } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isError, error, isLoading, refetch, isFetching } = useUserControllerFinOneGuruQuery({
    id: Number(params.id)
  });
  const [deleteUser, { isLoading: loadingDelete, error: deleteError }] = useUserControllerDeleteMutation();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteUser({ id: Number(params.id) })
      setShowModal(false);
      router.push('/admin/guru'); // Arahkan kembali ke halaman utama setelah menghapus
    } catch (error) {
      console.error('Failed to delete guru:', error);
    }
  };

  useEffect(() => {
    refetch()
  }, [refetch]);
  
  return (
    <></>
    // <>
    //   {isLoading || isFetching ?
    //   <div className="text-center">
    //     <Spinner size="xl"/>
    //   </div>
    //   : isError ? <h1>{`${error}`}</h1>
    //   : data !== undefined && data.guru !== null ?
    //   <>
    //   <Card>
    //     <h2 className="text-xl font-semibold">{data.guru.nama_lengkap}</h2>
    //     <p className="text-white">Username: {data.guru.username}</p>
    //     <p className="text-white">Email: {data.guru.email}</p>
    //     <p className="text-white">Role: {data.guru.role.role}</p>
    //     <p className="text-white">Dibuat Pada: {moment(data.guru.createdAt).tz('Asia/Jakarta').format('DD MMMM YYYY')}</p>
    //     <p className="text-white">Diubah Pada: {moment(data.guru.updatedAt).tz('Asia/Jakarta').format('DD MMMM YYYY')}</p>
    //     <div className="flex gap-2 mt-4">
    //       <Button onClick={() => router.push(`edit/${params.id}`)}>Edit</Button>
    //       <Button color="failure" onClick={() => setShowModal(true)}>Hapus</Button>
    //     </div>
    //   </Card>

    //   <Card className="mt-4">
    //     <h3 className="text-lg font-semibold">Kelas</h3>
    //     <List>
    //       {data.guru.kelas.map((kelasItem) => (
    //         <List.Item key={kelasItem.kelas.id}>{kelasItem.kelas.nama_kelas}</List.Item>
    //       ))}
    //     </List>
    //   </Card>

    //   <Card className="mt-4">
    //     <h3 className="text-lg font-semibold">Pelajaran yang Dibuat</h3>
    //     <List>
    //       {data.guru.createdPelajaran.map((pelajaranItem, index) => (
    //         <List.Item key={index}>{pelajaranItem.nama_pelajaran}</List.Item>
    //       ))}
    //     </List>
    //   </Card>

    //   <Card className="mt-4">
    //     <h3 className="text-lg font-semibold">Materi yang Dibuat</h3>
    //     <List>
    //       {data.guru.createdMateri.map((materiItem, index) => (
    //         <List.Item key={index}>{materiItem.nama_materi}</List.Item>
    //       ))}
    //     </List>
    //   </Card>

    //   <Card className="mt-4">
    //     <h3 className="text-lg font-semibold">Tugas yang Dibuat</h3>
    //     <Table>
    //       <Table.Head>
    //         <Table.HeadCell>Nama Tugas</Table.HeadCell>
    //       </Table.Head>
    //       <Table.Body>
    //         {data.guru.createdTugas.map((tugasItem, index) => (
    //           <Table.Row key={index}>
    //             <Table.Cell>{tugasItem.nama_tugas}</Table.Cell>
    //           </Table.Row>
    //         ))}
    //       </Table.Body>
    //     </Table>
    //   </Card>

    //   <Modal show={showModal} onClose={() => setShowModal(false)}>
    //     <Modal.Header>Konfirmasi Hapus</Modal.Header>
    //     <Modal.Body>
    //       <p>Apakah Anda yakin ingin menghapus guru ini?</p>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={handleDelete}>Hapus</Button>
    //       <Button color="gray" onClick={() => setShowModal(false)}>Batal</Button>
    //     </Modal.Footer>
    //   </Modal>
    //   </> :
    //   <h1>User tidak ditemukan</h1>
    //   }
    // </>
  );
}